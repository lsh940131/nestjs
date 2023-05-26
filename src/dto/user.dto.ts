import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty()
  public email: string;

  @ApiProperty()
  public name: string;
}

export class UserReadDto {
  public email: string;
  public name: string;
}
