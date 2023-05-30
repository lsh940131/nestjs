import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import * as multer from "multer";
import { existsSync, mkdirSync } from "fs";

const option = {
	fileFilter: (req, file, cb) => {
		if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
			cb(null, true);
		} else {
			cb("EXTENSION_TYPE_ERROR", false);
		}
	},

	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			const uploadPath: string = "uploads";

			if (!existsSync(uploadPath)) {
				mkdirSync(uploadPath);
			}

			cb(null, uploadPath);
		},

		// TODO: 서버로 들어오는 file name이 중복되면 uploads에서 씹힐 가능성 있음.
		filename: (req, file, cb) => {
			cb(null, file.originalname);
		},
	}),
};

@Injectable()
export class MulterInterceptor implements NestInterceptor {
	constructor(fileType) {}

	async intercept(context: ExecutionContext, next: CallHandler) {
		const req = context.switchToHttp().getRequest();
		const res = context.switchToHttp().getResponse();

		const upload = multer(option).single("file");

		await upload(req, res, (err) => {
			if (err) {
				console.log(err);
				console.log(" >> multer error! stop here!");
			}
		});

		return next.handle();
	}
}
