import {
  ConfirmUserAccountPayload,
  ResetUserPasswordPayload,
  WelcomeUserPayload,
} from '@shared/events/notification/notification.payload';
import { Inject, Injectable } from '@nestjs/common';
import { SendEmailOptionsDto } from '../email/dtos/send-email-options.dto';
import { EmailService } from '../email/email.service';
import { getEmailBody } from '../utils/get-notification-action.util';
import { LoggerService } from '@shared/logger/logger.service';
import { EmailType } from './enums/email-events.enum';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from '../config/env-key.enum';
import { CreatedUserPayload } from '@shared/events/user/user.payload';

@Injectable()
export class NotificationService {
  @Inject() private readonly loggerService: LoggerService;

  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  private createClientOptions(
    data: Record<string, any>,
    type: EmailType,
  ): SendEmailOptionsDto {
    const { email } = data;
    const { emailTemplate, emailTitle } = getEmailBody(type, data);
    return {
      options: {
        from: this.configService.get(EnvKey.NFTS_EMAIL),
        subject: emailTitle,
        to: [email, this.configService.get(EnvKey.NFTS_EMAIL)],
        html: emailTemplate,
      },
      type,
    };
  }

  public async initialSetup(
    createdUserNotification: CreatedUserPayload,
  ): Promise<any> {
    try {
      const confirmEmailResult = await this.emailService.sendEmail(
        this.createClientOptions(
          createdUserNotification,
          EmailType.CONFIRM_EMAIL,
        ),
      );
      const welcomeEmailResult = await this.emailService.sendEmail(
        this.createClientOptions(
          createdUserNotification,
          EmailType.WELCOME_MESSAGE,
        ),
      );

      return confirmEmailResult && welcomeEmailResult;
    } catch (error) {
      return false;
    }
  }

  public async resetPassword(
    resetUserPasswordPayload: ResetUserPasswordPayload,
  ): Promise<boolean> {
    try {
      return await this.emailService.sendEmail(
        this.createClientOptions(
          resetUserPasswordPayload,
          EmailType.RESET_USER_PASSWORD,
        ),
      );
    } catch (error) {
      return false;
    }
  }

  public async welcomeMessage(
    welcomeUserPayload: WelcomeUserPayload,
  ): Promise<boolean> {
    try {
      return await this.emailService.sendEmail(
        this.createClientOptions(welcomeUserPayload, EmailType.WELCOME_MESSAGE),
      );
    } catch (error) {
      return false;
    }
  }

  public async confirmEmail(data: ConfirmUserAccountPayload): Promise<boolean> {
    try {
      return await this.emailService.sendEmail(
        this.createClientOptions(data, EmailType.CONFIRM_EMAIL),
      );
    } catch (error) {
      return false;
    }
  }
}
