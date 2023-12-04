import { ApiProperty } from "@nestjs/swagger";

/**
 * 클라이언트 응답 모델
 */
export class ResponseModel {
	constructor(data?: any) {
		this.data = data;
	}

	@ApiProperty({ description: "HTTP 상태 코드", default: 200 })
	statusCode: number;

	@ApiProperty({ description: "payload", default: null })
	data: any;

	@ApiProperty({ description: "에러가 났을 경우 참조", default: null })
	error: any;
}
