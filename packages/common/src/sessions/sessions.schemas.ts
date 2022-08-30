import { Type } from '@sinclair/typebox';
import { EMAIL_ERROR_MESSAGE, EMAIL_REGEX, PASSWORD_ERROR_MESSAGE, PASSWORD_REGEX } from '../constants';
import { createFastifySchema } from '../utils';

export const sessionSchema = Type.Object({
  id: Type.Number(),
  username: Type.String(),
  email: Type.String(),
  details: Type.Object({
    firstName: Type.String(),
    lastName: Type.Union([Type.String(), Type.Null()]),
  }),
  profile: Type.Object({
    description: Type.String(),
  }),
});

export const createSessionSchema = createFastifySchema({
  body: Type.Object({
    email: Type.RegEx(EMAIL_REGEX, { errorMessage: EMAIL_ERROR_MESSAGE }),
    password: Type.RegEx(PASSWORD_REGEX, { errorMessage: PASSWORD_ERROR_MESSAGE }),
  }),
  response: {
    200: sessionSchema,
  },
});

export const getSessionSchema = createFastifySchema({
  response: {
    200: sessionSchema,
  },
});

export const deleteSessionSchema = createFastifySchema({
  response: {
    204: Type.Object({}),
  },
});
