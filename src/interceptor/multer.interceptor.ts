import { Injectable, NestInterceptor, ExecutionContext, CallHandler, OnModuleInit, BadRequestException } from "@nestjs/common";
import { tap } from "rxjs";
import { Request, RequestHandler } from "express";
import { existsSync, mkdirSync, unlink } from "fs";
import * as multer from "multer";

/**
 * Delete files that have completed service logic
 */
@Injectable()
export class MulterInterceptor implements NestInterceptor, OnModuleInit {
	private uploadPath: string = "uploads";
	private multer: multer.Multer;
	private uploader: RequestHandler;
	private fieldname: string;
	private names: string[];

	onModuleInit() {
		if (!existsSync(this.uploadPath)) {
			mkdirSync(this.uploadPath);
		}
	}

	constructor() {
		this.multer = multer({ dest: this.uploadPath });
	}

	single(fieldname: string) {
		this.fieldname = fieldname;
		this.uploader = this.multer.single(fieldname);
		return this;
	}

	array(fieldname: string, maxCount?: number) {
		this.fieldname = fieldname;
		this.uploader = this.multer.array(fieldname, maxCount);
		return this;
	}

	fields(fields: { name: string; maxCount?: number }[]) {
		this.names = fields.map((field) => field.name);
		this.uploader = this.multer.fields(fields);
		return this;
	}

	async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
		// Execute the logic before going to the controller
		const req = context.switchToHttp().getRequest();
		const res = context.switchToHttp().getResponse();

		try {
			await new Promise((resolve, reject) => {
				this.uploader(req, res, (err: any) => {
					if (err) {
						reject(err);
					}
					resolve(true);
				});
			});
		} catch (e) {
			throw new BadRequestException("Bad Request", { description: e });
		}

		if (this.fieldname) {
			req.body[this.fieldname] = req.file;
		} else if (this.names && req.files) {
			for (let name of this.names) {
				req.body[name] = req.files[name];
			}
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
			for (let field in req.files) {
				arr.push(...req.files[field]);
			}
		} else if (req.file) {
			arr.push(req.file);
		}

		return arr;
	}
}
