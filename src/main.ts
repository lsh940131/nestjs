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

	const config = new DocumentBuilder()
		.setTitle("Swagger 타이틀")
		.setDescription("Swagger description")
		.setVersion("서버 버전")
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				name: "JWT",
				in: "header",
			},
			"token",
		)
		.addSecurityRequirements("token")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	const option = {
		customSiteTitle: "Nest boilerplate",
	};
	SwaggerModule.setup("/docs", app, document, option);

	await app.listen(SERVER.port);
}
bootstrap();
