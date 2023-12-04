import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ResponseModel } from "./model/common/response.model";
import { ApiResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiResponse({ type: ResponseModel })
	getHello(): ResponseModel {
		return this.appService.getHello();
	}
}
