import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.secret,
      signOptions: { expiresIn: '5d' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
