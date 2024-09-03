import MESSAGE from "../constants/message";

type SignupProps = {
  userId: string;
  userPassword: string;
  verifyPassword: string;
};

function userId(userId: string): string | null {
  const pattern = /^[a-zA-Z0-9]*$/;
  return pattern.test(userId) ? null : MESSAGE.ERROR_MESSAGE.userId;
}

function userPassword(userPassword: string): string | null {
  const lengthValid = userPassword.length >= 8;
  const hasLetters = /[a-zA-Z]/.test(userPassword);
  const hasNumbers = /\d/.test(userPassword);

  if (!hasLetters || !hasNumbers || !lengthValid) {
    return MESSAGE.ERROR_MESSAGE.password;
  }

  return null;
}

function verifyPassword(
  userPassword: string,
  verifyPassword: string | undefined
): string | null {
  return userPassword === verifyPassword
    ? null
    : MESSAGE.ERROR_MESSAGE.verifyPassword;
}

function form(data: SignupProps): void {
  const errors: { [key in keyof SignupProps]?: string | null } = {
    userId: Validator.signup.userId(data.userId),
    userPassword: Validator.signup.userPassword(data.userPassword),
    verifyPassword: Validator.signup.verifyPassword(
      data.userPassword,
      data.verifyPassword
    ),
  };

  (Object.keys(errors) as (keyof SignupProps)[]).forEach((key) => {
    const errorMessage = errors[key];
    if (errorMessage) {
      throw new Error(errorMessage);
    }
  });
}
export const Validator = {
  signup: {
    form,
    userId,
    userPassword,
    verifyPassword,
  },
};
