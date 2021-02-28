import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './types/user.interface';
import { Constant, generateToken, encPassword, getNow } from '../../helpers';
import { UserLoginDto, UserRegisterDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(Constant.USER_MODEL)
    private userModel: Model<User>
  ) {}

  async getUserByToken(token: string): Promise<any | null> {
    const result = await this.userModel.findOne({ token: token });
    if (result) {
      const objUser = {
        name: result.name,
        username: result.username,
        token: result.token,
      };

      return objUser;
    }

    return null;
  }

  async getUserByUsername(username: string): Promise<any | null> {
    const result = await this.userModel.findOne({ username: username });
    if (result) {
      const objUser = {
        name: result.name,
        username: result.username,
        token: result.token,
      };

      return objUser;
    }

    return null;
  }

  async login(user: UserLoginDto): Promise<object | null> {
    const password = encPassword(user.password);

    const result = await this.userModel.findOne({
      username: user.username,
      password: password,
    });

    if (result) {
      const token = generateToken(result.username);
      // update last login and token
      await this.userModel.updateOne(
        {
          username: user.username,
          password: password,
        },
        {
          lastLogin: getNow(),
          token: token,
        }
      );

      return {
        name: result.name,
        username: result.username,
        token: token,
      };
    }

    return null;
  }

  async logout(username: string) {
    await this.userModel.updateOne({ username: username }, { token: '' });
  }

  async create(user: UserRegisterDto): Promise<User | Error> {
    const password = encPassword(user.password);

    return this.userModel
      .create({
        name: user.name,
        username: user.username,
        password: password,
      })
      .then((res) => ({
        name: res.name,
        username: res.username,
        password: res.password,
      }))
      .catch((err) => err);
  }
}
