import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Body, Request, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Inject } from "@nestjs/common";
import { FileInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { GalleryService } from "./gallery.service";
import { multerOptions } from "../../config/multer.option";
import { MulterInterceptor } from "../../interceptor";
import { TypedRoute } from "@nestia/core";
import { ApiTags } from "@nestjs/swagger";
import { InjectMysql, MysqlProvider } from "../../lib/db/mysql";
@Controller("gallery")
@ApiTags("gallery")
export class GalleryController {
	constructor(
		private readonly galleryService: GalleryService, // private readonly db: MysqlProvider // @Inject("IMySqlOptions") private readonly db: MysqlProvider,
		private readonly db: MysqlProvider, // @InjectMysql() private readonly db: MysqlProvider,
	) {}

	@Post("/upload/single")
	@UseInterceptors(FileInterceptor("file", multerOptions))
	public uploadSingle(
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
	)
	public uploadMulti(
		@UploadedFiles()
		files: {
			avatar?: Express.Multer.File[];
			background?: Express.Multer.File[];
		},
	) {
		console.log("/upload/multi");
	}

	@TypedRoute.Post("/upload/test/single")
	@UseInterceptors(new MulterInterceptor().single({ name: "image", filter: ["jpg", "jpeg"] }))
	public async testSingle(@Request() req, @Body() body) {
		console.log(" >> controller");
		console.log(body);

		const result = await this.db.query("select * from user");
		console.log(result);

		return true;
	}

	@TypedRoute.Post("/upload/test/array")
	@UseInterceptors(new MulterInterceptor().array({ name: "image", maxCount: 2, filter: ["jpg", "jpeg"] }))
	public testArray(@Request() req, @Body() body) {
		console.log(" >> controller");
		console.log(body);

		return true;
	}

	@TypedRoute.Post("/upload/test/fields")
	@UseInterceptors(new MulterInterceptor().fields([{ name: "image", maxCount: 2 }]))
	public testMulti(@Request() req, @Body() body) {
		console.log(" >> controller");
		console.log(body);

		return true;
	}
}
