import { IDatabaseValidator } from "@shared/data/interfaces/database-validator.interface";
import { errorMessageBuilder } from "../../error-message-builder";
import * as joi from "joi";
import validator from "validator";
import { CustomHelpers } from "joi";

export const _validateToken = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return value.length == 64;
};

export const validateToken: IDatabaseValidator = {
  validator: _validateToken,
  message: errorMessageBuilder,
};

export const validateTokenWithJoi = joi.string();

const customJWTValidator = (value: string, helpers: CustomHelpers) => {
  const condiction = validator.isJWT(value);
  if (!condiction) {
    return helpers.error("any.invalid");
  }
  return value;
};

export const validateJWTWithJoi = joi
  .string()
  .custom(customJWTValidator, "JWT validator")
  .messages({ "any.invalid": '"token" Invalid JWT Token' });
