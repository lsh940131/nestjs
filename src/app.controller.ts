import { Controller, Get } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { ResponseDto } from "./common/dto/response.dto";
import { CustomApiResponse } from "./common/decorator/custom-api-response";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@CustomApiResponse(200, "응답 성공/에러 케이스", [
		{
			title: "성공",
			model: ResponseDto,
			data: {
				id: 1,
			},
		},
		{
			title: "에러",
			model: ResponseDto,
			data: null,
			error: {
				code: 1,
				message: "Invalid input",
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
