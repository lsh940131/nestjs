import { UnsupportedMediaTypeException } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";

export const multerOptions = {
	fileFilter: (request, file, callback) => {
		if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
			callback(null, true);
		} else {
			callback(new UnsupportedMediaTypeException("Invalid file format."), false);
		}
	},

	storage: diskStorage({
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
