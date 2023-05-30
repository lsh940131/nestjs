import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Body, Request } from "@nestjs/common";
import { FileInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../config/multer.option";

import { MulterInterceptor } from "../interceptor/multer.interceptor";

@Controller("gallery")
export class GalleryController {
	constructor() {}

	@Post("/upload/single")
	@UseInterceptors(new MulterInterceptor("image"))
	// @UseInterceptors(FileInterceptor("file", multerOptions))
	async upload(@UploadedFile() file: Express.Multer.File, @Request() req) {
		console.log({ file });

		return true;
	}

	@Post("/upload/multi")
	@UseInterceptors(
		FileFieldsInterceptor(
			[
				{ name: "avatar", maxCount: 2 },
				{ name: "background", maxCount: 2 },
			],
			multerOptions,
		),
	)
	uploadFile(
		@UploadedFiles()
		files: {
			avatar?: Express.Multer.File[];
			background?: Express.Multer.File[];
		},
	) {
		console.log(files);
	}
}

// multer 써서 파일 업로드해가지고 속성 까서 업로드 이미지의 찍힌 시간 순으로 정렬 가능한지 가늠하기
