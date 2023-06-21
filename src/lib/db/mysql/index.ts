/**
 * mysql pool을 moduleInit 시 만들어 두고, 직접 query와 tx의 connection을 제공
 * 주로 controller에서 tx connect를 받아서 base service에 주입 or tx 주입이 없을 경우 service나 model에서 알아서 가져다 쓸 것
 */
import { Injectable, OnModuleInit } from "@nestjs/common";
import * as mysql from "mysql2/promise";
import { Transaction } from "./transaction";
import { MYSQL_POOL_OPTION } from "../../../../env.js";

@Injectable()
export class Mysql implements OnModuleInit {
	private pool: mysql.Pool;

	constructor() {}

	onModuleInit() {
		this.pool = mysql.createPool(MYSQL_POOL_OPTION);
	}

	async getTransaction(): Promise<Transaction> {
		const connection = await this.pool.getConnection();
		const tx = new Transaction(connection);
		await tx.begin();

		return tx;
	}

	async query(sql: string, values?: any | any[]) {
		const connection = await this.pool.getConnection();

		try {
			const [result] = await connection.query(sql, values);

			await connection.commit();

			return result;
		} catch (e) {
			await connection.rollback();
			throw e;
		} finally {
			connection.release();
		}
	}
}
