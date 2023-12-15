import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ResponseDto } from "./common/dto/response.dto";
import { ApiResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiResponse({ type: ResponseDto })
	getHello() {
		return this.appService.getHello();
	}
}
