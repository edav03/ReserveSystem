import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.model';
import { AuthService } from '../../application/auth.service';
import { UserLoginDto } from '../dto/userLogin.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() userLogin: UserLoginDto) {
    return this.authService.login(userLogin);
  }
}
