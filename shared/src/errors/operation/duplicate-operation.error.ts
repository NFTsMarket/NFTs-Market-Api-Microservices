import { BaseError } from "@shared/errors/base-error.abstract";
import { ErrorCode } from "@shared/errors/enums/error-code.enum";

export class DuplicateOperationError extends BaseError {
  readonly code = ErrorCode.INVALID_OPERATION;
  message = "You have already performed this operation";

  constructor() {
    super();
    Object.setPrototypeOf(this, DuplicateOperationError.prototype);
  }
}
