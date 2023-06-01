import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";

export const multerOptions = {
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
