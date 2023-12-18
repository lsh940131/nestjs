import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
const HTTP_STATUS_CODE = Object.keys(HttpStatus)
	.filter((i) => isNaN(Number(i)))
	.map((k) => HttpStatus[k]);

/**
 * 클라이언트 응답
 */
export class ResponseDto<T> {
	@ApiProperty({ enum: HTTP_STATUS_CODE, description: "HTTP 상태 코드", default: 200 })
	statusCode: number;

	@ApiProperty({ description: "payload", default: null })
	data: T;

	@ApiProperty({ description: "에러가 났을 경우 참조", default: null })
	error: any;
}
