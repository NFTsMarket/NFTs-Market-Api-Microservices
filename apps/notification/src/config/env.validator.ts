import { commonEnvValidationObject } from '@shared/validations/common/env/common-env.validation-object';
import { validateUrlWithJoi } from '@shared/validations/common/internet/url/url.validator';
import { validateEnviromentWithJoi } from '@shared/validations/enviroment/enviroment.validator';
import * as joi from 'joi';

export const validateEnv = joi.object({
  ...commonEnvValidationObject,
  HOST_CONFIRM_EMAIL: validateUrlWithJoi.required(),
  HOST_RESET_PASSWORD: validateUrlWithJoi.required(),
  NFTS_EMAIL: joi.string().required(),
  SENGRID_USER: joi.string().required(),
  SENGRID_API_KEY: joi.string().required(),
  MAIL_ENVIRONMENT: validateEnviromentWithJoi,
});
