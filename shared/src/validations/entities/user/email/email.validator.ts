import { IDatabaseValidator } from "@shared/data/interfaces/database-validator.interface";
import validator from "validator";
import { errorMessageBuilder } from "../../../error-message-builder";
import * as joi from "joi";

export const _validateEmail = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return validator.isEmail(value);
};

export const validateEmail: IDatabaseValidator = {
  validator: _validateEmail,
  message: errorMessageBuilder,
};

export const validateEmailWithJoi = joi.string().email();
