import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(
    @Body() body: { email: string; name: string },
  ): Promise<number> {
    const { email, name } = body;

    const id = await this.userService.create({ email, name });

    return id;
  }
}
