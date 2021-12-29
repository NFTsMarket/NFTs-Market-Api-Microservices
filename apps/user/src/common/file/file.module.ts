import { Module } from '@nestjs/common';
import { JwtStrategy } from '@shared/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@shared/auth/guards/global-jwt-auth-and-roles.guard';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';

@Module({
  providers: [
    FileService,
    FileResolver,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard,
  ],
})
export class FileModule {}
