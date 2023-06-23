import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { GalleryModule } from "./gallery/gallery.module";
import { UserModule } from "./user/user.module";
import { MysqlModule } from "../lib/db/mysql/mysql.module";
import { MYSQL_POOL_OPTION } from "../../env";

@Module({
	imports: [MysqlModule.forRoot(MYSQL_POOL_OPTION), ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }), GalleryModule, UserModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor() {}
}
