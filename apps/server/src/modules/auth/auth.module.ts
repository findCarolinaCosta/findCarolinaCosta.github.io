import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicStrategyService } from './basic.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'basic' })],
  providers: [AuthService, BasicStrategyService],
  exports: [PassportModule],
})
export class AuthModule {}
