import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./domain/user/user.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { AllExceptionFilter } from "./common/filter/exception.filter";
import { PrismaModule } from "./prisma/prisma.module";
import { ResponseInterceptor } from "./common/interceptor/response.interceptor";

@Module({
	imports: [UserModule, PrismaModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: AllExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
	],
})
export class AppModule {}
