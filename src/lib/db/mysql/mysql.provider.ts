import { Inject, Injectable } from "@nestjs/common";
import * as mysql from "mysql2/promise";
import { MYSQL_OPTIONS } from "./mysql.constants";
import { MySqlOptions } from "./interfaces/config.interface";
import { Transaction } from "./mysql.transaction";
import { TransactionInterface } from "./interfaces/transaction.interface";

@Injectable()
export class MysqlProvider {
	private pool: any;

	constructor(@Inject(MYSQL_OPTIONS) private readonly options: MySqlOptions) {
		this.pool = mysql.createPool(options);
	}

	async getTransaction(): Promise<TransactionInterface> {
		const conn = await this.pool.getConnection();

		const tx = new Transaction(conn);
		await tx.beginTransaction();

		return tx;
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
