import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<number>('DB_PORT');

        return {
          uri: `mongodb://${host}:${port}`,
          user: configService.get<string>('DB_USER'),
          pass: configService.get<string>('DB_PASS'),
          dbName: configService.get<string>('DB_NAME'),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
