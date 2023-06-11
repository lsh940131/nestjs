import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserService } from "./user/user.service";
import { UserController } from "./user/user.controller";
import { GalleryController } from "./gallery/gallery.controller";
import { GalleryService } from "./gallery/gallery.service";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })],
	controllers: [AppController, UserController, GalleryController],
	providers: [AppService, UserService, GalleryService],
})
export class AppModule {
	constructor() {}
}
