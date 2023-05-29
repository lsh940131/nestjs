import { HttpException, HttpStatus, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, Type } from "@nestjs/common";
import { FileInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { Observable, map } from "rxjs";

import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";

function exteionReg(type: string): object {
	const value = [];
	switch (type) {
		case "image":
			value.push("jpg", "jpeg", "png");
	}

	return new RegExp(`(${value.join("|")})$`);
}

const option = {
	fileFilter: (req, file, cb) => {
		if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
			cb(null, true);
		} else {
			cb("EXTENSION_TYPE_ERROR", false);
		}
	},

	storage: diskStorage({
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

export class multer implements NestInterceptor {
	intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
		const req = context.switchToHttp().getRequest();
		const authHeader = req.headers.authorization;

		const result = FileInterceptor("file", option);
		console.log(result);

		return handler.handle();
	}
}

// export class Multer {
// 	constructor() {}
// }
