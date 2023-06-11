import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
	@ApiProperty()
	public email: string;

	@ApiProperty()
	public name: string;
}

export class UserReadDto {
	@ApiProperty()
	public id: number;
}
