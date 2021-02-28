import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserLoginDto, UserRegisterDto } from './dto';
import { AuthGuard } from '../../guards/auth.guard';
import { HttpException } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@Req() request: any, @Res() response: Response) {
    return response.status(HttpStatus.OK).json({
      success: true,
      message: 'Success get user',
      data: request.user,
    });
  }

  @Post('/login')
  async login(@Body() user: UserLoginDto, @Res() response: Response) {
    const result = await this.userService.login(user);

    if (result) {
      return response.status(HttpStatus.OK).json({
        success: true,
        message: 'Success login user',
        data: result,
      });
    }

    throw new HttpException('Wrong username or password user', HttpStatus.BAD_REQUEST);
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req: any, @Res() response: Response) {
    await this.userService.logout(req.user.username);

    response.status(HttpStatus.OK).json({
      success: true,
      message: 'Success logout',
      data: null,
    });
  }

  @Post('/register')
  async create(@Body() user: UserRegisterDto, @Res() response: Response) {
    const result = await this.userService.create(user);
    if (result instanceof Error) {
      throw new HttpException('Username has already taken', HttpStatus.BAD_REQUEST);
    }

    return response.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Success create user',
      data: {
        name: user.name,
        username: user.username,
      },
    });
  }
}
