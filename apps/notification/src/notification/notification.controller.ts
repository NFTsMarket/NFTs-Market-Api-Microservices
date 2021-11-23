import { NotificationEvents } from '@shared/events/notification/notification.events';
import {
  ConfirmUserAccountPayload,
  ResetUserPasswordPayload,
  WelcomeUserPayload,
} from '@shared/events/notification/notification.payload';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern({ type: NotificationEvents.ConfirmUserAccount })
  public async confirmEmail(
    confirmUserAccountPayload: ConfirmUserAccountPayload,
  ): Promise<any> {
    return this.notificationService.confirmEmail(confirmUserAccountPayload);
  }

  @MessagePattern({ type: NotificationEvents.ResetUserPassword })
  public async resetPassword(
    resetUserPasswordPayload: ResetUserPasswordPayload,
  ): Promise<any> {
    return this.notificationService.resetPassword(resetUserPasswordPayload);
  }

  @MessagePattern({ type: NotificationEvents.WelcomeMessage })
  public async welcomeMessage(
    welcomeUserPayload: WelcomeUserPayload,
  ): Promise<any> {
    return this.notificationService.welcomeMessage(welcomeUserPayload);
  }
}
