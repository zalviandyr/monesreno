import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller()
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getBlog() {
    console.log(this.blogService.provideService());
    return 'Blog Controller';
  }
}
