import { Injectable, NestInterceptor, ExecutionContext, CallHandler, OnModuleInit } from "@nestjs/common";
import { tap } from "rxjs";
import { Request } from "express";
import { existsSync, mkdirSync, unlink } from "fs";
import * as multer from "multer";
import typia from "typia";

type uploader = multer.Multer;
interface Imulter {
	/**
	 * @pattern ^(single|array|fields|any|none)$
	 */
	type: string;
}

/**
 * Delete files that have completed service logic
 */
@Injectable()
export class MulterInterceptor implements NestInterceptor, OnModuleInit {
	uploadPath: string = "uploads";
	uploader: uploader;

	onModuleInit() {
		if (!existsSync(this.uploadPath)) {
			mkdirSync(this.uploadPath);
		}
	}

	constructor(init: { type: string }) {
		const validated: typia.IValidation<Imulter> = typia.validate<Imulter>(init);
		if (!validated.success) {
			console.log(" >> typia validate error !");
		}

		this.uploader = multer({ dest: this.uploadPath })[init.type];
	}

	async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
		// Execute the logic before going to the controller
		const req = context.switchToHttp().getRequest();
		const res = context.switchToHttp().getResponse();

		const uploader = multer({
			dest: this.uploadPath,
		}).single("file");
		await new Promise((resolve, reject) => {
			uploader(req, res, (err: any) => {
				if (err) {
					reject(err);
				}
				req.body.file = req.file;
				resolve(true);
			});
		});

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
