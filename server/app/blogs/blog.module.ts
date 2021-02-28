import { Module } from '@nestjs/common';
import { BlogController } from './blog.contoller';
import { BlogService } from './blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
