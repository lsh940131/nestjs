import { Controller, Post, Get, Body, UseInterceptors, Query, Inject } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { UserCreateDto, UserReadDto } from "../../dto";
import { ConfigService } from "@nestjs/config";
import { MysqlService } from "../../lib/db/mysql/mysql.service";

import { TypedRoute, TypedQuery, TypedBody } from "@nestia/core";

@Controller("user")
@ApiTags("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly config: ConfigService, // private readonly db: MysqlService
		@Inject("MysqlConnection") private readonly db: MysqlService,
	) {}

	@TypedRoute.Post("/")
	@ApiOperation({ summary: "유저 생성", description: "유저 생성" })
	@ApiCreatedResponse({ description: "유저 생성", type: Object })
	@UseInterceptors()
	async createUser(@TypedBody() body: UserCreateDto): Promise<{ id: number }> {
		// const id = await this.userService.create(body);

		const { email, name } = body;
		const conn1 = await this.db.getTransaction();

		const r1 = await conn1.query("insert into user set ?", [{ email, name }]);
		console.log(r1.insertId);

		// console.time("process");
		// await new Promise((resolve, reject) => {
		// 	setTimeout(async () => {
		// 		console.timeLog("process");
		// 		await conn1.commit();
		// 		conn1.release();
		// 		resolve(0);
		// 	}, 5000);
		// });
		// console.timeEnd("process");
		// console.log(">> commit");
		await conn1.commit();
		conn1.release();

		const id = r1.insertId;
		return { id };
	}

	@TypedRoute.Get("/")
	@ApiOperation({ summary: "유저 조회", description: "유저 조회" })
	@ApiCreatedResponse({ description: "유저 조회", type: UserReadDto })
	async getUser(@TypedQuery() query: UserReadDto): Promise<any> {
		const r = await this.db.query("select * from user");
		console.log(r);

		return 1;
	}

	@TypedRoute.Get("/query")
	@ApiOperation({ summary: "유저 조회", description: "유저 조회" })
	@ApiCreatedResponse({ description: "유저 조회", type: Object })
	async getUserQuery(@TypedQuery() query: UserReadDto): Promise<number> {
		const [c1, c2] = await Promise.all([this.db.getTransaction(), this.db.getTransaction()]);

		const r1 = await c1.query("SELECT CONNECTION_ID();");
		const r2 = await c2.query("SELECT CONNECTION_ID();");
		console.log(r1, r2);

		return 1;
	}
}
