import { ApiProperty } from "@nestjs/swagger";

export class ErrorDto {
	@ApiProperty({ description: "서버에서 정의 에러 코드", default: 1 })
	code: number;

	@ApiProperty({ description: "에러 메세지", default: "error message" })
	message?: String;
}
