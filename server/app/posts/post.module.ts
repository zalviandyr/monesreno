import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from '../users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [DatabaseModule, UserModule, MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
