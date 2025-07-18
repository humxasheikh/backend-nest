import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('singup')
  async singUp(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User already exists.');
    }
    const user = await this.usersService.create(createUserDto);
    return { message: 'User created', userId: user._id };
  }

  @Get(':email')
  findAll(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
