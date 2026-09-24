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
  @HttpCode(201)
  signUp(@Body() signupData: Record<string, any>) {
    return this.authService.signUp(
      signupData.username,
      signupData.email,
      signupData.password,
    );
  }

  @HttpCode(201)
  @Post('signin')
  signIn(@Body() signInData: Record<string, any>) {
    return this.authService.signIn(signInData.email, signInData.password);
  }
}
