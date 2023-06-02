import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { tap } from "rxjs";
import { Request } from "express";

import * as multer from "multer";
import { existsSync, mkdirSync, unlink } from "fs";

/**
 * Delete files that have completed service logic
 */
@Injectable()
export class MulterInterceptor implements NestInterceptor {
	option = {
		storage: multer.diskStorage({
			destination: (request, file, callback) => {
				const uploadPath: string = "uploads";

				if (!existsSync(uploadPath)) {
					mkdirSync(uploadPath);
				}

				callback(null, uploadPath);
			},
			filename: (request, file, callback) => {
				callback(null, file.originalname);
			},
		}),
	};

	async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
		// Execute the logic before going to the controller

		const req = context.switchToHttp().getRequest();
		const res = context.switchToHttp().getResponse();

		console.log(req.file);
		const uploader = multer(this.option).single("file");
		const r = await new Promise((resolve, reject) => {
			uploader(req, res, (err: any) => {
				if (err) {
					reject(err);
				}
				req.body.file = req.file;
				resolve(true);
			});
		});

		console.log("==================================");
		console.log(r);
		console.log(req.file);

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
