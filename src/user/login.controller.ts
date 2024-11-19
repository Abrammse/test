import { Controller,  Post, Body, } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('login')
export class loginController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: any) {
    const {username, password} = body
    return this.userService.login(username,password);
  }
}
