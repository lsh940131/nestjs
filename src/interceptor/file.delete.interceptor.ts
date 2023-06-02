import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Request } from "express";
import { unlink } from "fs";

/**
 * Delete files that have completed service logic
 */
@Injectable()
export class FileDeleteInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		// Execute the logic before going to the controller
		// nothing();

		// Callhanler is executed after completing the service logic
		return next.handle().pipe(
			tap({
				next: (): void => {
					const req = context.switchToHttp().getRequest();
					const files = this.getFiles(req);

					for (let file of files) {
						unlink(file.path, (err) => {
							if (err) {
								console.log(` >> FileDeleteInterceptor unlink error: ${err}`);
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
