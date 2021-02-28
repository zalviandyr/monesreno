import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../app/users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token: string = request.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      const user = await this.userService.getUserByToken(token);
      if (user) {
        request.user = user;

        return true;
      }

      return false;
    }

    return false;
  }
}
