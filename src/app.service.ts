import { Injectable } from "@nestjs/common";
import { ResponseDto } from "./common/dto/response.dto";

@Injectable()
export class AppService {
	getHello() {
		const response = new ResponseDto();

		response.data = "Hello World!";

		return response;
	}
}
