import { Type } from '@sinclair/typebox';
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_REGEX,
  FULL_NAME_ERROR_MESSAGE,
  FULL_NAME_REGEX,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_REGEX,
  USERNAME_ERROR_MESSAGE,
  USERNAME_REGEX,
} from '../constants';
import { createFastifySchema } from '../utils';

export const userSchema = Type.Object({
  id: Type.Number(),
  username: Type.String(),
  details: Type.Object({
    firstName: Type.String(),
    lastName: Type.Union([Type.String(), Type.Null()]),
  }),
  profile: Type.Object({
    description: Type.String(),
  }),
});

const userRequestSchema = Type.Object({
  fullName: Type.RegEx(FULL_NAME_REGEX, { errorMessage: FULL_NAME_ERROR_MESSAGE }),
  username: Type.RegEx(USERNAME_REGEX, { errorMessage: USERNAME_ERROR_MESSAGE }),
  email: Type.RegEx(EMAIL_REGEX, { errorMessage: EMAIL_ERROR_MESSAGE }),
  password: Type.RegEx(PASSWORD_REGEX, { errorMessage: PASSWORD_ERROR_MESSAGE }),
});

export const createUserSchema = createFastifySchema({
  body: userRequestSchema,
  response: {
    201: userSchema,
  },
});

export const updateUserSchema = createFastifySchema({
  params: Type.Object({
    userId: Type.Number(),
  }),
  body: Type.Partial(Type.Intersect([userRequestSchema, Type.Object({ description: Type.String() })])),
  response: {
    200: userSchema,
  },
});

export const getUsersSchema = createFastifySchema({
  querystring: Type.Partial(
    Type.Object({
      username: Type.String(),
      firstName: Type.String(),
      lastName: Type.String(),
      search: Type.String(),
    })
  ),
  response: {
    200: Type.Array(userSchema),
  },
});

export const handleUserFollowSchema = createFastifySchema({
  params: Type.Object({
    userId: Type.Number(),
    followId: Type.Number(),
  }),
  response: {
    204: Type.Object({}),
  },
});

export const getUserFollowsSchema = createFastifySchema({
  params: Type.Object({
    userId: Type.Number(),
  }),
  response: {
    200: Type.Array(userSchema),
  },
});

export const getUserFollowSchema = createFastifySchema({
  params: Type.Object({
    userId: Type.Number(),
    followId: Type.Number(),
  }),
  response: {
    200: userSchema,
  },
});

export const getUserStatisticsSchema = createFastifySchema({
  params: Type.Object({
    userId: Type.Number(),
  }),
  response: {
    200: Type.Object({
      posts: Type.Number(),
      followers: Type.Number(),
      following: Type.Number(),
    }),
  },
});
