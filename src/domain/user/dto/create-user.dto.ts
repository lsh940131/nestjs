import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";
import { ValidateItemInArray } from "src/decorators/validator.itemInArray.decorator";

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
	@ValidateItemInArray(["M", "W"])
	readonly gender: string;
}
