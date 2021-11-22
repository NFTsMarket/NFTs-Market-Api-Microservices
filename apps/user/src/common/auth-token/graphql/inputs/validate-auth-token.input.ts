import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateStringWithJoi } from '@shared/validations/data-types/string/string.validator';
import { validateTokenWithJoi } from '@user/validations/token/token.validator';
import { validatePasswordWithJoi } from '@user/validations/password/password.validator';
import { InputType, Field } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class ValidateAuthTokenInput extends ValidationInput {
  @Field()
  token: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  origin: string;

  public static validationSchema = joi.object<ValidateAuthTokenInput>({
    token: validateTokenWithJoi.required(),
    origin: validateStringWithJoi.required(),
    password: validatePasswordWithJoi,
  });
}
