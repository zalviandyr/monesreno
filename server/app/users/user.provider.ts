import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { UserSchema } from './types/user.schema';
import { Constant } from '../../helpers';

export const userProviders: Provider[] = [
  {
    provide: Constant.USER_MODEL,
    useFactory: (connection: Connection) => {
      return connection.model('user', UserSchema);
    },
    inject: [Constant.DATABASE_CONNECTION],
  },
];
