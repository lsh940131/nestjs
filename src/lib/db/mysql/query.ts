import * as mysql from "mysql2/promise";

export class Transaction {
	private connection: mysql.PoolConnection;

	constructor(connection: mysql.PoolConnection) {
		this.connection = connection;
	}

	async begin() {
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
	release() {
		this.connection.release();
	}
}
