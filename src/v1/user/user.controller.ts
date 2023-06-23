import { Controller, Post, Get, Body, UseInterceptors, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { UserCreateDto, UserReadDto } from "../../dto";
import { ConfigService } from "@nestjs/config";
import { MysqlService } from "../../lib/db/mysql/mysql.service";
@Controller("user")
@ApiTags("user")
export class UserController {
	constructor(private readonly userService: UserService, private readonly config: ConfigService, private readonly db: MysqlService) {}

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
	@ApiCreatedResponse({ description: "유저 조회", type: UserReadDto })
	async getUser(@Query() query: UserReadDto): Promise<Object> {
		const conn = await this.db.getConnection();

		await this.db.transaction(conn);

		const result = await this.db.execute({
			conn,
			sql: `select * from user`,
			value: [1],
		});
		console.log(result);

		return 1;
	}

	@Get("/query")
	@ApiOperation({ summary: "유저 조회", description: "유저 조회" })
	@ApiCreatedResponse({ description: "유저 조회", type: Object })
	async getUserQuery(@Query() query: UserReadDto): Promise<Object> {
		// const result = await this.mysql.query("select * from user");
		// console.log(result);

		return 1;
	}
}
