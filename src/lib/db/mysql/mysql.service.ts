import { Inject, Injectable } from "@nestjs/common";
import * as mysql from "mysql2/promise";
import { CONFIG_OPTIONS } from "./common.constants";
import { MySqlOptions } from "./interfaces/config.interface";
import { QueryInterface } from "./interfaces/query.interface";

@Injectable()
export class MysqlService {
	constructor(@Inject(CONFIG_OPTIONS) private readonly options: MySqlOptions) {
		this.pool = mysql.createPool(options);
	}
	private pool: any;

	getConnection(): Promise<any> {
		return this.pool.getConnection();
	}

	async query(sql: string, value?: any) {
		const [result] = await this.pool.query(sql, value);

		return result;
	}

	async execute(sql: string, value?: any) {
		const [result] = await this.pool.execute(sql, value);

		return result;
	}
}
