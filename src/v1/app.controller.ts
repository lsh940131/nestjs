import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation, ApiBearerAuth, ApiSecurity } from "@nestjs/swagger";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("/hello")
	@ApiOperation({ summary: "테스트용", description: "" })
	getHello(): string {
		return this.appService.getHello();
	}
}
