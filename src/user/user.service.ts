import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
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
    } finally {
      await prisma.$disconnect();
    }
  }
}
