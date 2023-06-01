import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Body, Request, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from "@nestjs/common";
import { FileInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { GalleryService } from "./gallery.service";
import { multerOptions } from "../config/multer.option";
import { FileDeleteInterceptor } from "../interceptor/file.delete.interceptor";
@Controller("gallery")
export class GalleryController {
	constructor(private readonly galleryService: GalleryService) {}

	@Post("/upload/single")
	@UseInterceptors(FileInterceptor("file", multerOptions), FileDeleteInterceptor)
	async uploadSingle(
		@UploadedFile(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 100000 }), new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })] })) file: Express.Multer.File,
	) {
		console.log("/upload/single");

		this.galleryService.upload();

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
		FileDeleteInterceptor,
	)
	uploadMulti(
		@UploadedFiles()
		files: {
			avatar?: Express.Multer.File[];
			background?: Express.Multer.File[];
		},
	) {
		console.log("/upload/multi");
	}
}
