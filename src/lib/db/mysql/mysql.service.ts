import { Inject, Injectable } from "@nestjs/common";
import * as mysql from "mysql2/promise";
import { CONFIG_OPTIONS } from "./common.constants";
import { MySqlOptions } from "./interfaces/config.interface";
import { QueryInterface } from "./interfaces/query.interface";
import { TransactionInterface } from "./interfaces/transaction.interface";

@Injectable()
export class MysqlService {
	constructor(@Inject(CONFIG_OPTIONS) private readonly options: MySqlOptions) {
		this.pool = mysql.createPool(options);
	}
	private pool: any;

	async getTransaction(): Promise<TransactionInterface> {
		const conn = await this.pool.getConnection();
		await conn.beginTransaction();

		return conn;
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
