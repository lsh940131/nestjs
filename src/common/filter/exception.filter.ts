import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { ResponseDto } from "../dto/response.dto";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let res: ResponseDto;
		if (exception instanceof ResponseDto) {
			res = exception;
		} else {
			res = new ResponseDto(500, null, { code: 500, message: "Internal Server Error" });
		}

		response.status(200).json(res);

		// for logging
		// timestamp: new Date().toISOString(),
		// path: request.url,
	}
}
