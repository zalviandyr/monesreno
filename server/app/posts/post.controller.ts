import { Controller, Body, Get, Post, UseGuards, Res, Req, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post.create.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { Response } from 'express';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getPosts(@Res() response: Response) {
    const results = await this.postService.get();

    return response.status(HttpStatus.OK).json({
      success: true,
      message: 'Success get posts',
      data: results,
    });
  }

  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Body() post: PostCreateDto, @Req() req: any, @Res() response: Response) {
    const result = await this.postService.create(post, req.user.username);

    return response.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Success create post',
      data: result,
    });
  }
}
