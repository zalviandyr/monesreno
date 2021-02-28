import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly lastLogin: string;
  readonly token: string;
  readonly createdAt: string;
}
