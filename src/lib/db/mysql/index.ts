/**
 * mysql pool을 moduleInit 시 만들어 두고, 직접 query와 tx의 connection을 제공
 * 주로 controller에서 tx connect를 받아서 base service에 주입 or tx 주입이 없을 경우 service나 model에서 알아서 가져다 쓸 것
 */
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as mysql from "mysql2/promise";
import { Transaction } from "./transaction";

@Injectable()
export class Mysql implements OnModuleInit {
	private pool: mysql.Pool;

	constructor(private readonly config: ConfigService) {}

	onModuleInit() {
		const poolConfig = {
			connectionLimit: this.config.get("MYSQL_CONNECTIONLIMIT"),
			host: this.config.get("MSQYL_HOST"),
			user: this.config.get("MSQYL_USER"),
			password: this.config.get("MSQYL_PASSWORD"),
			database: this.config.get("MSQYL_DATABASE"),
			enableKeepAlive: this.config.get("MSQYL_ENABLEKEEPALIVE"),
		};
		this.pool = mysql.createPool(poolConfig);

		console.log(" >> MYSQL CREATE POOL");
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
