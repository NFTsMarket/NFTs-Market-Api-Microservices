import { Module } from '@nestjs/common';
import { JwtStrategy } from '@shared/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@shared/auth/guards/global-jwt-auth-and-roles.guard';
import { Upload } from './graphql/types/upload.scalar';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';

@Module({
  imports: [],
  providers: [
    Upload,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard,
    FileService,
    FileResolver
  ],
})
export class FileModule {}
