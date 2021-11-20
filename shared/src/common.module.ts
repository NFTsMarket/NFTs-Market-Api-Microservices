import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { LoggerModule } from './logger/logger.module';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [LoggerModule, FirebaseAdminModule],
})
export class CommonModule {}
