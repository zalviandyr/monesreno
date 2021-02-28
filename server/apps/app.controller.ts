import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  httpGet(): string {
    return 'Rest API Monesreno (MongoDB, Nest JS, React JS, Node JS)';
  }
}
