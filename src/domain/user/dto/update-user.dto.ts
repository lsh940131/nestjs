import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";
import { ValidatorOneOfArray } from "../../../common/decorator/validator-one-of-array.decorator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiProperty({ required: false, maxLength: 200 })
	@IsEmail()
	@IsString()
	readonly email?: string;

	@ApiProperty({ required: false, maxLength: 100 })
	@IsString()
	readonly name?: string;

	@ApiProperty({ required: false, description: "M: Man | W: Woman" })
	@ValidatorOneOfArray(["M", "W"])
	readonly gender?: string;
}
