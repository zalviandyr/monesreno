import mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  post: String,
  username: String,
  updatedAt: String,
  createdAt: String,
});
