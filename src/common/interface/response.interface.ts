import { IError } from "./error.interface";

export interface IResponse {
	statusCode: number;
	data: any;
	error?: IError;
}
