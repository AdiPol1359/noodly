export const FULL_NAME_REGEX = /^[a-zA-Z\s]+$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USERNAME_REGEX = /^[a-z0-9\s]+$/;
export const PASSWORD_REGEX = /^.{6,16}$/;

export const FULL_NAME_ERROR_MESSAGE = 'Full name can only contain letters and numbers.';
export const EMAIL_ERROR_MESSAGE = 'Incorrect email.';
export const USERNAME_ERROR_MESSAGE = 'Username can only contain lowercase letters and numbers.';
export const PASSWORD_ERROR_MESSAGE = 'Password can be 6 to 16 characters long.';
