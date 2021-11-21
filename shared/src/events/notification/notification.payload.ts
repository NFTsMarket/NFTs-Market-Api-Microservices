export class WelcomeUserPayload {
  name: string;
  lastName: string;
  email: string;
}

export class ConfirmUserAccountPayload {
  name: string;
  lastName: string;
  email: string;
  url: string;
}

export class CreatedUserNotification {
  name: string;
  lastName: string;
  email: string;
  url: string;
}

export class ResetUserPasswordPayload {
  email: string;
  url: string;
}

export class UpdatedUserPasswordPayload {
  name: string;
  lastName: string;
  email: string;
}
