import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ConflictException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

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
    console.log(createUserDto.name);
    const user = await this.usersService.create(createUserDto);
    return { message: 'User created', userId: user._id };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  myProfile(@Request() req) {
    return req.user;
  }
  @UseGuards()
  @Get(':email')
  findByEmail(@Param('email') email: string, @Request() req) {
    return this.usersService.findByEmail(email);
  }
}
