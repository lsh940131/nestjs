import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const result = await this.prisma.user.create({ data: createUserDto });

		return result?.id;
	}

	findAll() {
		return this.prisma.user.findMany({ where: { deleted_at: null } });
	}

	findOne(id: number) {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return this.prisma.user.update({ data: updateUserDto, where: { id } });
	}

	delete(id: number) {
		return this.prisma.user.update({ data: { deleted_at: new Date() }, where: { id } });
	}
}
