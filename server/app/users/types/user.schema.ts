import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import moment from 'moment';

export const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  lastLogin: String,
  token: String,
  createdAt: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') },
});

UserSchema.plugin(uniqueValidator);
