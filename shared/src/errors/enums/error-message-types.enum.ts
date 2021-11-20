export enum ErrorMessage {
  EntityNotFoundError = "Entity not found",
  FieldNotFoundErrorMessage = "Field not defined on your entity",
  GqlOperationNotFoundErrorMessage = "Operation not defined",
  ObjectTypeError = "Expected variable of type object but found object of type",
  InvalidFieldValueErrorMessage = "Field got an invalid value",
  DuplicateValueInArrayErrorMessage = "Field got a duplicated value",
  InvalidFunctionInput = "Received invalid function input",
  BadImplementationErrorMessage = "Internal server error. Bad implementation",
  InvalidSlugConfigErrorMessage = "Invalid slug configuration provided",
  TestFailedErrorMessage = "Test failed",
  InvalidSignInMethod = "Cannot sign in using this method, user already has an account",
  MalformedRefreshToken = "Refresh token malformed",
  RevokedRefreshToken = "Refresh token revoked",
  ExpiredRefreshToken = "Refresh token expired",
}
