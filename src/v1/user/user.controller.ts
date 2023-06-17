import { Controller, Post, Get, Body, UseInterceptors, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { UserCreateDto, UserReadDto } from "../../dto";
import { ConfigService } from "@nestjs/config";
import { Mysql } from "../../lib/db/mysql";
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService, private readonly config: ConfigService, private mysql: Mysql) {}

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
		const tx = await this.mysql.getTransaction();

		const r = await tx.query("select * from user");
		console.log(r);

		await tx.commit();
		await tx.release();

		// const result = await this.userService.get(query);

		// return result;
		return 1;
	}

	@Get("/query")
	@ApiOperation({ summary: "유저 조회", description: "유저 조회" })
	@ApiCreatedResponse({ description: "유저 조회", type: Object })
	async getUserQuery(@Query() query: UserReadDto): Promise<Object> {
		const result = await this.mysql.query("select * from user");
		console.log(result);

		return 1;
	}
}
