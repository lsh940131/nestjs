import { Controller, Post, Get, Body, UseInterceptors, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { UserCreateDto, UserReadDto } from "../../dto";
import { Transaction } from "../../lib/db/transaction";
import { ConfigService } from "@nestjs/config";
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService, private readonly config: ConfigService) {}

	@Post("/")
	@ApiOperation({ summary: "유저 생성", description: "유저 생성" })
	@ApiCreatedResponse({ description: "유저 생성", type: Object })
	@UseInterceptors()
	async createUser(@Body() body: UserCreateDto): Promise<Object> {
		const id = await this.userService.create(body);

		return { id };
	}

	@Get("/")
	@ApiOperation({ summary: "유저 조회", description: "유저 조회" })
	@ApiCreatedResponse({ description: "유저 조회", type: Object })
	async getUser(@Query() query: UserReadDto): Promise<Object> {
		const tx = new Transaction(this.config);
		await tx.begin();
		const r = await tx.query("select * from user");
		console.log(r);
		await tx.commit();

		// const result = await this.userService.get(query);

		// return result;
		return 1;
	}
}
