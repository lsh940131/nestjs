import { Injectable, NestInterceptor, ExecutionContext, CallHandler, OnModuleInit, BadRequestException } from "@nestjs/common";
import { tap } from "rxjs";
import { Request, RequestHandler } from "express";
import { existsSync, mkdirSync, unlink } from "fs";
import * as multer from "multer";
import { extname } from "path";

interface option {
	name: string;
	maxCount?: number;
	filter?: string[];
}

/**
 * simple multer interceptor
 * finally delete uploaded files after service logic
 */
@Injectable()
export class MulterInterceptor implements NestInterceptor, OnModuleInit {
	private uploadPath: string = "uploads";
	private uploader: RequestHandler;
	private uploaderType: string;
	options: option[];

	onModuleInit() {
		if (!existsSync(this.uploadPath)) {
			mkdirSync(this.uploadPath);
		}
	}

	constructor() {}

	single(option: option) {
		this.uploaderType = "single";
		this.options = [option];

		this.uploader = multer({
			dest: this.uploadPath,
			fileFilter: this.fileFilter(this.options),
		}).single(option.name);

		return this;
	}

	array(option: option) {
		this.uploaderType = "array";
		this.options = [option];

		this.uploader = multer({
			dest: this.uploadPath,
			fileFilter: this.fileFilter(this.options),
		}).array(option.name, option.maxCount);

		return this;
	}

	fields(options: option[]) {
		this.uploaderType = "fields";
		this.options = options;

		this.uploader = multer({
			dest: this.uploadPath,
			fileFilter: this.fileFilter(this.options),
		}).fields(options.map((opt) => ({ name: opt.name, maxCount: opt.maxCount })));

		return this;
	}

	fileFilter(options: option[]) {
		return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
			const [option] = options.filter((option) => option.name == file.fieldname);
			if (option?.filter) {
				const regexp = new RegExp(option.filter.join("|"));

				const ext = regexp.test(extname(file.originalname));
				const mimetype = regexp.test(file.mimetype);
				if (ext && mimetype) {
					return cb(null, true);
				} else {
					return cb(new Error("INVALID_FILE_EXTENSION"));
				}
			}
		};
	}

	async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
		// Execute the logic before going to the controller
		const req = context.switchToHttp().getRequest();
		const res = context.switchToHttp().getResponse();

		try {
			await new Promise<void>((resolve, reject) => {
				this.uploader(req, res, (err: any) => {
					if (err) {
						reject(err.toString());
					}
					resolve();
				});
			});
		} catch (e) {
			throw new BadRequestException("Bad Request", { description: e });
		}

		switch (this.uploaderType) {
			case "single":
				req.body[this.options[0].name] = req.file;
				break;

			case "array":
				req.body[this.options[0].name] = req.files;
				break;

			case "fields":
				if (req.files) {
					for (let option of this.options) {
						req.body[option.name] = req.files[option.name];
					}
				}
				break;
		}

		// Callhanler is executed after completing the service logic
		return next.handle().pipe(
			tap({
				next: (): void => {
					const files = this.getFiles(req);

					for (let file of files) {
						unlink(file.path, (err) => {
							if (err) {
								console.log(` >> MulterInterceptor unlink error: ${err}`);
								return err;
							}
						});
					}
				},
				error: (err: Error): void => {
					// do nothing
				},
			}),
		);
	}

	getFiles(req: Request): Express.Multer.File[] {
		const arr: Express.Multer.File[] = [];

		if (req.files) {
			// req.files's type is array
			if (this.uploaderType == "array") {
				for (let i in req.files) arr.push(req.files[i]);
			}
			// // req.files's type is json
			else if (this.uploaderType == "fields") {
				for (let field in req.files) {
					arr.push(...req.files[field]);
				}
			}
		} else if (req.file) {
			arr.push(req.file);
		}

		return arr;
	}
}
