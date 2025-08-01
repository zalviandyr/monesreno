import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { forEach } from 'p-iteration';
import { PostCreateDto } from './dto/post.create.dto';
import { UserService } from '../users/user.service';
import { getNow } from '../../helpers';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
    private userService: UserService
  ) {}

  async get(): Promise<Array<any>> {
    const posts = await this.postModel.find();
    const results: Array<any> = [];
    await forEach(posts, async (val) => {
      const user = await this.userService.getUserByUsername(val.username);

      results.push({
        post: val.post,
        name: user.name,
        username: val.username,
        createdAt: val.createdAt,
      });
    });

    results.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0));

    return results;
  }

  async create(post: PostCreateDto, username: string): Promise<Post | Error> {
    return this.postModel
      .create({
        post: post.post,
        username: username,
        createdAt: getNow(),
      })
      .then((res) => ({
        post: res.post,
        username: res.username,
        updatedAt: res.updatedAt,
        createdAt: res.createdAt,
      }))
      .catch((err) => err);
  }
}
