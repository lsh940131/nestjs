import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserOkDto } from "./dto/create-user-ok.dto";
import { CustomApiResponse } from "../../common/decorator/custom-api-response";
import { ResponseDto } from "../../common/dto/response.dto";

@Controller("user")
@ApiTags("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@CustomApiResponse(201, "유저 생성", [
		{
			title: "성공",
			model: CreateUserOkDto,
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

	@Put(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.userService.delete(+id);
	}
}
