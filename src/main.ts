import { NestFactory } from "@nestjs/core";
import { AppModule } from "./v1/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder().setTitle("Swagger 타이틀").setDescription("Swagger description").setVersion("서버 버전").build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api-docs", app, document);

	await app.listen(3000);
}
bootstrap();
