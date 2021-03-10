import { Injectable } from '@nestjs/common';

// 요청, 응답에 대해서는 몰라요.
@Injectable()
export class AppService {
  async getUser(): string {
    const user = await User.findOne();
    return user;
  }

  async postUser(): string {
    const user = await User.create();
    return user;
  }
}
