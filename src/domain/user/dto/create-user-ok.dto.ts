import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/common/dto/response.dto";

export class CreateUserOkDto {
	@ApiProperty({ example: { id: 1 } })
	data: object;
}
