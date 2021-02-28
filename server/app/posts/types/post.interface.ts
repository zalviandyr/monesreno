import { Document } from 'mongoose';

export interface Post extends Document {
  readonly post: string;
  readonly username: string;
  readonly updatedAt: string;
  readonly createdAt: string;
}
