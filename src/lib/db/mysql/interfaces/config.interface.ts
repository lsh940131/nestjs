import { ModuleMetadata, Type } from "@nestjs/common";

// https://github.com/mysqljs/mysql
export interface MySqlOptions {
	host?: string;
	port?: number;
	user?: string;
	password?: string;
	database?: string;

	charset?: string;
	timezone?: string;
	multipleStatements?: boolean;
	debug?: boolean;
	trace?: boolean;
	localAddress?: string;
	socketPath?: string;
	stringifyObjects?: boolean;
	insecureAuth?: boolean;
	typeCast?: boolean;
	queryFormat?: any;
	supportBigNumbers?: boolean;
	bigNumberStrings?: any;
	localInfile?: boolean;
	flags?: any;
	ssl?: any;

	waitForConnections?: boolean;
	queueLimit?: number;
	connectTimeout?: number;
	dateStrings?: boolean;
	decimalNumbers?: boolean;
	connectionLimit?: number;
}

export interface MysqlOptionsFactory {
	createMysqlOptions(): Promise<MySqlOptions> | MySqlOptions;
}

export type MysqlModuleFactoryOptions = Omit<MySqlOptions, "connectionName">;

export interface MysqlAsyncOptions extends Pick<ModuleMetadata, "imports"> {
	connectionName?: string;
	useExisting?: Type<MysqlOptionsFactory>;
	useClass?: Type<MysqlOptionsFactory>;
	useFactory?: (...args: any[]) => Promise<MysqlModuleFactoryOptions> | MysqlModuleFactoryOptions;
	inject?: any[];
}
