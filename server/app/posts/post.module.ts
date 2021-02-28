import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { postProvider } from './post.provider';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from '../users/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [PostController],
  providers: [PostService, ...postProvider],
})
export class PostModule {}
