import { Injectable } from "@nestjs/common";
import { PrismaClient, Prisma } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class UserService {
	constructor(private readonly config: ConfigService) {}

	async create({ email, name }): Promise<number> {
		const prisma = new PrismaClient();

		try {
			const user = {
				email,
				name,
			};

			const result = await prisma.user.create({ data: user });

			return result.id;
		} catch (e) {
			console.log(e);

			throw e;
		} finally {
			await prisma.$disconnect();
		}
	}

	async get({ id }): Promise<any> {
		const prisma = new PrismaClient();

		try {
			const result = await prisma.user.findUnique({ where: { id: id } });

			return result;
		} catch (e) {
			console.log(e);

			throw e;
		} finally {
			await prisma.$disconnect();
		}
	}
}
