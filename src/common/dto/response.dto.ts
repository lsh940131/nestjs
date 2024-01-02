import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
import { ErrorDto } from "./error.dto";
const HTTP_STATUS_CODE = Object.keys(HttpStatus)
	.filter((i) => isNaN(Number(i)))
	.map((k) => HttpStatus[k]);

/**
 * 클라이언트 응답
 */
export class ResponseDto {
	constructor(statusCode?: number, data?: any, error?: ErrorDto) {
		this.statusCode = statusCode;
		this.data = data;
		this.error = error;
	}

	@ApiProperty({ enum: HTTP_STATUS_CODE, description: "HTTP 상태 코드. 서버에 이상이 없는 한 에러 케이스도 200.", default: 200 })
	statusCode: number;

	@ApiProperty({ description: "any type", default: null })
	data: any;

	@ApiProperty({ description: "응답 성공일 때 null. 에러가 났을 경우 참조", default: null, nullable: true, required: false })
	error?: ErrorDto;
}
