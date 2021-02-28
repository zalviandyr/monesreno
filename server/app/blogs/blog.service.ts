import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  provideService() {
    return 'Blog Service - Provide Service';
  }
}
