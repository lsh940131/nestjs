import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { GalleryModule } from "./gallery/gallery.module";
import { UserModule } from "./user/user.module";
import { MysqlModule } from "../lib/db/mysql/mysql.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
		MysqlModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				host: config.get<string>("MYSQL_HOST"),
				port: config.get<number>("MYSQL_PORT"),
				user: config.get<string>("MYSQL_USER"),
				password: config.get<string>("MYSQL_PASSWORD"),
				database: config.get<string>("MYSQL_DATABASE"),
			}),
		}),
		UserModule,
		GalleryModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor() {}
}
