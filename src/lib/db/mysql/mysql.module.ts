import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";

import { MYSQL_MODULE_OPTIONS, CONFIG_OPTIONS, MYSQL_CONNECTION } from "./common.constants";
import { MySqlOptions, MysqlAsyncOptions, MysqlOptionsFactory } from "./interfaces/config.interface";
import { MysqlService } from "./mysql.service";

@Module({})
@Global()
export class MysqlModule {
	constructor(private readonly moduleRef: ModuleRef) {}

	static forRoot(options: MySqlOptions): DynamicModule {
		return {
			module: MysqlModule,
			providers: [
				{
					provide: CONFIG_OPTIONS,
					useValue: options,
				},
				MysqlService,
			],
			exports: [MysqlService],
		};
	}

	static forRootAsync(options: MysqlAsyncOptions): DynamicModule {
		const provider: Provider = {
			inject: [MYSQL_MODULE_OPTIONS],
			provide: MYSQL_CONNECTION,
			useFactory: async (options: MySqlOptions) => new MysqlService(options),
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
