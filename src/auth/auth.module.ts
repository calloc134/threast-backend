import { Module, UseGuards } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionGuard } from './guard/session-auth.guard';
import { RoleGuard } from './guard/role-auth.guard';

@Module({
  providers: [AuthService, SessionGuard, RoleGuard],
  imports: [PrismaModule],
  exports: [SessionGuard, AuthService, RoleGuard],
  controllers: [AuthController],
})
export class AuthModule {}
