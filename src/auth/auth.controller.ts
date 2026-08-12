import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// type UserType = {
//   id:
// };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signupData: Record<string, any>) {
    return this.authService.signUp(
      signupData.username,
      signupData.email,
      signupData.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInData: Record<string, any>) {
    return this.authService.signIn(signInData.email, signInData.password);
  }
}
