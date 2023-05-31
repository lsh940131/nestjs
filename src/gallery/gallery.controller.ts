import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Body, Request, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from "@nestjs/common";
import { FileInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../config/multer.option";

@Controller("gallery")
export class GalleryController {
	constructor() {}

	@Post("/upload/single")
	@UseInterceptors(FileInterceptor("file", multerOptions))
	async uploadMulter(
		@UploadedFile(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 100000 }), new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })] })) file: Express.Multer.File,
	) {
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
