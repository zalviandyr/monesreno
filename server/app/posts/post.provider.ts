import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { PostSchema } from './types/post.schema';
import { Constant } from '../../helpers';

export const postProvider: Provider[] = [
  {
    provide: Constant.POST_MODEL,
    useFactory: (connection: Connection) => {
      return connection.model('post', PostSchema);
    },
    inject: [Constant.DATABASE_CONNECTION],
  },
];
