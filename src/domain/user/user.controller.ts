import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
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
	async create(@Body() createUserDto: CreateUserDto) {
		const data = await this.userService.create(createUserDto);

		return { statusCode: 201, data };
	}

	@Get()
	async findAll() {
		const data = await this.userService.findAll();

		const res = new ResponseDto();
		res.statusCode = 200;
		res.data = data;
		return res;
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const data = await this.userService.findOne(+id);

		return { statusCode: 200, data };
	}

	@Get("prisma/:id")
	async findOneByPrisma(@Param("id") id: string) {
		const data = await this.userService.findOneByPrisma(+id);

		return { statusCode: 200, data };
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		throw "error message";
		// return this.userService.update(+id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.userService.remove(+id);
	}
}
