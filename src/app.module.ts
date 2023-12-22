import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./domain/user/user.module";
import * as path from "path";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionFilter } from "./common/filter/exception.filter";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "admin",
			database: "nest",
			entities: [path.join(__dirname, "./", "/domain/**/entities/*.entity.{ts,js}")],
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: AllExceptionFilter,
		},
	],
})
export class AppModule {}
