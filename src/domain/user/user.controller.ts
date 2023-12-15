import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOkResponse, getSchemaPath, ApiResponse } from "@nestjs/swagger";
import { CreateUserOkDto } from "./dto/create-user-ok.dto";
import { ResponseDto } from "src/common/dto/response.dto";
import { ApiCustomResponse } from "src/decorator/api.custom.response.decorator";

@Controller("user")
@ApiTags("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	// @ApiOkResponse({ type: CreateUserOkDto })

	// @ApiResponse({
	// 	status: 201,
	// 	content: {
	// 		"application/json": {
	// 			example: {
	// 				예시1: {
	// 					value: { id: 10 },
	// 					description: "테스트",
	// 				},
	// 			},
	// 		},
	// 	},
	// })
	@ApiCustomResponse(201, [
		{
			title: "유저 생성 성공",
			description: "유저 생성 성공",
			model: CreateUserOkDto,
			value: { id: 10 },
		},
	])
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.userService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.userService.remove(+id);
	}
}
