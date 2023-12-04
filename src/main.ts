import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as expressBasicAuth from "express-basic-auth";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true }));
	app.use(["/api/docs"], expressBasicAuth({ challenge: true, users: { ["root"]: "admin" } }));

	const config = new DocumentBuilder().setTitle("API Document").setDescription("description").setVersion("0.1").build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/api/docs", app, document);

	await app.listen(3000);
}
bootstrap();
