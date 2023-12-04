import { Injectable } from "@nestjs/common";
import { ResponseModel } from "./model/common/response.model";

@Injectable()
export class AppService {
	getHello(): ResponseModel {
		const response = new ResponseModel();

		response.data = "Hello World!";

		return response;
	}
}
