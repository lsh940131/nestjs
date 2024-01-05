import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// validate pipe
	app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true }));

	// swagger
	setupSwagger(app);

	await app.listen(3000);
}
bootstrap();
