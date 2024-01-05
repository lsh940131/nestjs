import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";
import { readFileSync } from "fs";
import * as path from "path";

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
	const swaggerRouter: string = "/api/docs";
	const swaagerId: string = "root";
	const swaggerPass: string = "admin";

	const title: string = "API Document";
	const version: string = "0.1";

	app.use([swaggerRouter], expressBasicAuth({ challenge: true, users: { [swaagerId]: swaggerPass } }));
	const description: string = readFileSync(path.join(__dirname, "./", "description.md"), "utf-8");
	const config = new DocumentBuilder().setTitle(title).setDescription(description).setVersion(version).build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(swaggerRouter, app, document);
}
