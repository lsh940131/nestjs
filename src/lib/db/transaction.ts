import { ConfigService } from "@nestjs/config";
import * as mysql from "mysql2/promise";

export class Transaction {
	private pool: mysql.Pool;
	private connection: mysql.PoolConnection;

	constructor(private readonly config: ConfigService) {
		const poolConfig = {
			connectionLimit: config.get("MYSQL_CONNECTIONLIMIT"),
			host: config.get("MSQYL_HOST"),
			user: config.get("MSQYL_USER"),
			password: config.get("MSQYL_PASSWORD"),
			database: config.get("MSQYL_DATABASE"),
			enableKeepAlive: config.get("MSQYL_ENABLEKEEPALIVE"),
		};
		this.pool = mysql.createPool(poolConfig);
	}

	async begin() {
		this.connection = await this.pool.getConnection();
		await this.connection.beginTransaction();
	}

	async query(sql: string, values?: any | any[]) {
		try {
			const [result] = await this.connection.query(sql, values);

			return result;
		} catch (e) {
			await this.connection.rollback();
			await this.connection.release();

			throw e;
		}
	}

	async commit() {
		await this.connection.commit();
	}
	async rollback() {
		await this.connection.rollback();
	}
	async release() {
		await this.connection.release();
	}
}
