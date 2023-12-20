import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
import { IError } from "../interface/error.interface";
const HTTP_STATUS_CODE = Object.keys(HttpStatus)
	.filter((i) => isNaN(Number(i)))
	.map((k) => HttpStatus[k]);

/**
 * 클라이언트 응답
 */
export class ResponseDto {
	@ApiProperty({ enum: HTTP_STATUS_CODE, description: "HTTP 상태 코드", default: 200 })
	statusCode: number;

	@ApiProperty({ description: "any type", default: null })
	data: any;

	@ApiProperty({ description: "에러가 났을 경우 참조", default: null })
	error?: IError;
}
