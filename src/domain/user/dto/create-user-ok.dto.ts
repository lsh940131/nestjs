import { ApiProperty } from "@nestjs/swagger";

export class CreateUserOkDto {
	@ApiProperty({ default: 1 })
	id: number;
}
