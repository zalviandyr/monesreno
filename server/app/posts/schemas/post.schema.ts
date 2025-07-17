import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moment from 'moment';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  post: string;

  @Prop()
  username: string;

  @Prop()
  updatedAt: string;

  @Prop({ default: moment().format('YYYY-MM-DD HH:mm:ss') })
  createdAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
