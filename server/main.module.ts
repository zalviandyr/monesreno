import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppModule } from './apps/app.module';
import { UserModule } from './app/users/user.module';
import { BlogModule } from './app/blogs/blog.module';
import { PostModule } from './app/posts/post.module';
import { RouterModule, Routes } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

const routes: Routes = [
  {
    path: '/api',
    module: AppModule,
    children: [
      {
        path: '/users',
        module: UserModule,
      },
      {
        path: '/blogs',
        module: BlogModule,
      },
      {
        path: '/posts',
        module: PostModule,
      },
    ],
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../build'),
    }),
    RouterModule.register(routes),
    AppModule,
    UserModule,
    BlogModule,
    PostModule,
  ],
})
export class MainModule {}
