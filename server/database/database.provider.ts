import { Provider } from '@nestjs/common';
import mongoose from 'mongoose';
import { Constant } from '../helpers';

export const databaseProvider: Provider[] = [
  {
    provide: Constant.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://127.0.0.1:27017/monesreno', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
  },
];
