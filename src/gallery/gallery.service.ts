import { Injectable } from "@nestjs/common";

@Injectable()
export class GalleryService {
	upload() {
		console.log(" >> gallery service");
	}
}
