import { NestFactory } from "@nestjs/core";
import { AppModule } from "./v1/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";
import { SERVER, SWAGGER_USERS } from "../env.js";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(
		["/docs"],
		expressBasicAuth({
			challenge: true,
			users: SWAGGER_USERS,
		}),
	);

	const config = new DocumentBuilder().setTitle("Swagger 타이틀").setDescription("Swagger description").setVersion("서버 버전").build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);

	await app.listen(SERVER.port);
}
bootstrap();
