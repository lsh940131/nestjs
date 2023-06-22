import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";
import { SWAGGER_USERS } from "../../../env.js";
import { INestApplication } from "@nestjs/common";

export class Swagger {
	app: INestApplication;
	constructor(app: INestApplication) {
		this.app = app;
	}

	setup() {
		this.app.use(
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
		const document = SwaggerModule.createDocument(this.app, config);
		const option = {
			customSiteTitle: "Nest boilerplate",
		};
		SwaggerModule.setup("/docs", this.app, document, option);
	}
}
