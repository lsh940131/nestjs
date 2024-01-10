import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, "query" | "error"> implements OnModuleInit {
	constructor() {
		super({
			log: ["query"],
		});
	}

	async onModuleInit() {
		this.$on("query", (e) => console.log(e));

		await this.$connect();
	}
}
