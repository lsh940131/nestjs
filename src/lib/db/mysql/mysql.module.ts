import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";

import { MYSQL_MODULE_OPTIONS, MYSQL_OPTIONS } from "./mysql.constants";
import { MySqlOptions, MysqlAsyncOptions, MysqlOptionsFactory } from "./interfaces/config.interface";
import { MysqlProvider } from "./mysql.provider";

@Global()
@Module({})
export class MysqlModule {
	constructor() {}

	static forRoot(options: MySqlOptions): DynamicModule {
		return {
			module: MysqlModule,
			providers: [
				{
					provide: MYSQL_OPTIONS,
					useValue: options,
				},
				MysqlProvider,
			],
			exports: [MysqlProvider],
		};
	}

	static forRootAsync(options: MysqlAsyncOptions): DynamicModule {
		const provider: Provider = {
			inject: [MYSQL_MODULE_OPTIONS],
			provide: MYSQL_OPTIONS,
			useFactory: async (options: MySqlOptions) => new MysqlProvider(options),
		};

		return {
			module: MysqlModule,
			imports: options.imports,
			providers: [...this.createAsyncProviders(options), provider],
			exports: [provider],
		};
	}

	private static createAsyncProviders(options: MysqlAsyncOptions): Provider[] {
		if (options.useExisting || options.useFactory) {
			return [this.createAsyncOptionsProvider(options)];
		}

		const useClass = options.useClass as Type<MysqlOptionsFactory>;

		return [
			this.createAsyncOptionsProvider(options),
			{
				provide: useClass,
				useClass,
			},
		];
	}

	private static createAsyncOptionsProvider(options: MysqlAsyncOptions): Provider {
		if (options.useFactory) {
			return {
				provide: MYSQL_MODULE_OPTIONS,
				useFactory: options.useFactory,
				inject: options.inject || [],
			};
		}

		const inject = [(options.useClass || options.useExisting) as Type<MysqlOptionsFactory>];

		return {
			provide: MYSQL_MODULE_OPTIONS,
			useFactory: async (optionsFactory: MysqlOptionsFactory) => await optionsFactory.createMysqlOptions(),
			inject,
		};
	}
}
