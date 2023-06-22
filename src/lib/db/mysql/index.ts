/**
 * mysql pool을 moduleInit 시 만들어 두고, 직접 query와 tx의 connection을 제공
 * 주로 controller에서 tx connect를 받아서 base service에 주입 or tx 주입이 없을 경우 service나 model에서 알아서 가져다 쓸 것
 */
import { Injectable } from "@nestjs/common";
import * as mysql from "mysql2/promise";
import { Transaction } from "./transaction";
import { MYSQL_POOL_OPTION } from "../../../../env.js";

const pool: mysql.Pool = mysql.createPool(MYSQL_POOL_OPTION);
console.log(" >> CREATE MYSQL POOL");

async function getTransaction(): Promise<Transaction> {
	const connection = await pool.getConnection();
	const tx = new Transaction(connection);
	await tx.begin();

	return tx;
}

async function query(sql: string, values?: any | any[]) {
	const connection = await pool.getConnection();

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

export { getTransaction, query };
