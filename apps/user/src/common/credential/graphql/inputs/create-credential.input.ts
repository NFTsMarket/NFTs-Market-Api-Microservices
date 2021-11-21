import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateEmailWithJoi } from '@shared/validations/entities/user/email/email.validator';
import { validatePasswordWithJoi } from '@shared/validations/entities/user/password/password.validator';
import { InputType, Field } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType('SignInUserInput')
export class CreateCredentialInput extends ValidationInput {
  @Field()
  email: string;

  @Field()
  password: string;

  public static validationSchema = joi.object<CreateCredentialInput>({
    email: validateEmailWithJoi.required(),
    password: validatePasswordWithJoi.required(),
  });
}
