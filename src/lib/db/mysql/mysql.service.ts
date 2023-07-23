import { Inject, Injectable } from "@nestjs/common";
import * as mysql from "mysql2/promise";
import { CONFIG_OPTIONS } from "./common.constants";
import { MySqlOptions } from "./interfaces/config.interface";
import { TransactionInterface } from "./interfaces/transaction.interface";

@Injectable()
export class MysqlService {
	private pool: any;

	constructor(@Inject(CONFIG_OPTIONS) private readonly options: MySqlOptions) {
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

@Injectable({ scope: 2 })
class Transaction {
	private conn;

	constructor(conn) {
		this.conn = conn;
	}

	async beginTransaction(): Promise<any> {
		await this.conn.beginTransaction();
	}

	async query(sql: string, value?: any) {
		const [result] = await this.conn.query(sql, value);

		return result;
	}

	commit(): Promise<any> {
		return this.conn.commit();
	}

	rollback(): Promise<any> {
		return this.conn.rollback();
	}

	release(): void {
		return this.conn.release();
	}
}
