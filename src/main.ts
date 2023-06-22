import { NestFactory } from "@nestjs/core";
import { AppModule } from "./v1/app.module";
import { SERVER } from "../env.js";
import { Swagger } from "./lib/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const swagger = new Swagger(app);
	swagger.setup();

	await app.listen(SERVER.port);
}
bootstrap();
