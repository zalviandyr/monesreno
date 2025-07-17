import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moment from 'moment';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  lastLogin: string;

  @Prop()
  token: string;

  @Prop({ default: moment().format('YYYY-MM-DD HH:mm:ss') })
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
