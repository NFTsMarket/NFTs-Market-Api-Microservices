import { EmailTypes } from '@shared/data/enums/email-types.enum';

export const generateLink = (token: string, type: string): string => {
  if (type === EmailTypes.CONFIRM_ACCOUNT) {
    return `${process.env.HOST_CONFIRM_EMAIL}${token}`;
  }
  return `${process.env.HOST_RESET_PASSWORD}${token}`;
};
