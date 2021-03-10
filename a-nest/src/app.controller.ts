import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('abc')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // req, res에 대해 알아요.
  @Get('user') // GET /abc/user
  getUser(): string {
    return this.appService.getUser();
  }

  @Post('user') // POST /abc/user
  postUser(): string {
    return this.appService.postUser();
  }
}
