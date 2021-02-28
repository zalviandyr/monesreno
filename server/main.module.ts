import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RouterModule, Routes } from 'nest-router';
import { AppModule } from './apps/app.module';
import { UserModule } from './app/users/user.module';
import { BlogModule } from './app/blogs/blog.module';
import { PostModule } from './app/posts/post.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../build'),
    }),
    RouterModule.forRoutes(routes),
    AppModule,
    UserModule,
    BlogModule,
    PostModule,
  ],
})
export class MainModule {}
