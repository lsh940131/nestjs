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
		// const id = await this.userService.create(body);

		const { email, name } = body;
		const conn1 = await this.db.getConnection();
		await this.db.transaction(conn1);
		const [r1] = await conn1.query({ conn: conn1, sql: "insert into user set email='abcde', name='abc'", value: { email, name } });
		console.log(r1.insertId);

		console.time("process");
		await new Promise((resolve, reject) => {
			setTimeout(async () => {
				console.timeLog("process");
				await conn1.commit();
				conn1.release();
				resolve(0);
			}, 5000);
		});

		console.timeEnd("process");

		console.log(">> commit");

		const id = r1.insertId;
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

		const conn1 = await this.db.getConnection();
		const conn2 = await this.db.getConnection();

		const [r1] = await conn1.query({ conn: conn1, sql: "SELECT CONNECTION_ID()" });
		const [r2] = await conn2.query({ conn: conn2, sql: "SELECT CONNECTION_ID()" });
		console.log(r1, r2);

		conn1.release();
		conn2.release();

		return 1;
	}
}
