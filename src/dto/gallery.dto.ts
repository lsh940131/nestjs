import { ApiProperty } from "@nestjs/swagger";

export class GallerySingleUpload {
	@ApiProperty()
	public file: object[];
}
