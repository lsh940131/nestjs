import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { unlink } from "fs";

/**
 * 서비스 로직을 완료한 파일 삭제
 */
@Injectable()
export class FileDeleteInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		console.log(" >> FileDeleteInterceptor");

		const req = context.switchToHttp().getRequest();

		const files = this.getFiles(req);
		console.log({ files });
		for (let file of files) {
			unlink(file.path, (err) => {
				if (err) {
					console.log(err);
					return err;
				}
			});
		}

		return next.handle();
	}

	getFiles(req: Request): Express.Multer.File[] {
		if (req.files) {
			return [].concat(req.files);
		} else if (req.file) {
			return [req.file];
		} else {
			return [];
		}
	}
}
