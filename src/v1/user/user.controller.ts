import { Controller, Post, Body, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { UserCreateDto } from "../../dto";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("/")
	@ApiOperation({ summary: "유저 생성", description: "유저 생성" })
	@ApiCreatedResponse({ description: "유저 생성", type: Object })
	@UseInterceptors()
	async createUser(@Body() body: UserCreateDto): Promise<Object> {
		const userCreateDto = body;

		const id = await this.userService.create(userCreateDto);

		return { id };
	}
}
