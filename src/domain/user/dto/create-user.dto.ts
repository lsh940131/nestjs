import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";
import { ValidateOneOfArray } from "src/decorator/validator.oneOfArray.decorator";

export class CreateUserDto {
	@ApiProperty({ required: true, maxLength: 200 })
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	readonly email: string;

	@ApiProperty({ required: true, maxLength: 100 })
	@IsNotEmpty()
	@IsString()
	readonly name: string;

	@ApiProperty({ required: true, description: "M: Man | W: Woman" })
	@IsNotEmpty()
	@ValidateOneOfArray(["M", "W"])
	readonly gender: string;
}
