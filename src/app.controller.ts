import { Controller, Get } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { ResponseDto } from "./common/dto/response.dto";
import { ApiCustomResponse } from "./common/decorator/api-custom-response.decorator";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiCustomResponse(200, [
		{
			title: "응답 성공",
			description: "응답 성공",
			model: ResponseDto,
			data: {
				id: 1,
			},
		},
		{
			title: "응답 실패",
			description: "응답 실패",
			model: ResponseDto,
			statusCode: 404,
			data: null,
			error: {
				code: 1,
				message: "Not found",
			},
		},
	])
	get() {
		const res = new ResponseDto();
		res.statusCode = 200;
		res.data = "ok";
		return res;
	}
}
