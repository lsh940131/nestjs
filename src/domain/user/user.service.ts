import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

	async create(createUserDto: CreateUserDto) {
		const result = await this.userRepository.insert(createUserDto);

		return result?.identifiers;
	}

	findAll() {
		return this.userRepository.find();
	}

	findOne(id: number) {
		return this.userRepository.findOne({ where: { id } });
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
