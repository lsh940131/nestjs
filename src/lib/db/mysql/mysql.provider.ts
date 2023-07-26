import { Inject, Injectable } from "@nestjs/common";
import { Pool, PoolConnection, createPool } from "mysql2/promise";
import { Transaction } from "./mysql.transaction";
import { IMySqlOptions, ITransaction } from "./interfaces";
import { getToken } from "./mysql.util";
import { InjectMysql } from "./mysql.decorator";

@Injectable()
export class MysqlProvider {
	private pool: Pool;

	constructor(@InjectMysql() private readonly options: IMySqlOptions) {
		this.pool = createPool(options);
	}

	async getTransaction(): Promise<ITransaction> {
		const conn: PoolConnection = await this.pool.getConnection();

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
