import { Type } from '@sinclair/typebox';
import { userSchema } from '../users/users.schemas';
import { createFastifySchema } from '../utils';

export const postSchema = Type.Object({
  uuid: Type.String(),
  title: Type.String(),
  introduction: Type.String(),
  author: userSchema,
  creationDate: Type.Number(),
  updateDate: Type.Union([Type.Number(), Type.Null()]),
  content: Type.Optional(Type.String()),
});

const postRequestSchema = Type.Object({
  title: Type.String(),
  introduction: Type.String(),
  content: Type.String(),
});

export const createPostSchema = createFastifySchema({
  body: postRequestSchema,
  response: {
    201: postSchema,
  },
});

export const updatePostSchema = createFastifySchema({
  params: Type.Object({
    uuid: Type.String(),
  }),
  body: Type.Partial(postRequestSchema),
  response: {
    204: Type.Object({}),
  },
});

export const deletePostSchema = createFastifySchema({
  params: Type.Object({
    uuid: Type.String(),
  }),
  response: {
    204: Type.Object({}),
  },
});

export const getPostsSchema = createFastifySchema({
  querystring: Type.Partial(
    Type.Object({
      username: Type.String(),
    })
  ),
  response: {
    200: Type.Array(postSchema),
  },
});

export const getPostSchema = createFastifySchema({
  params: Type.Object({
    uuid: Type.String(),
  }),
  querystring: Type.Partial(
    Type.Object({
      username: Type.String(),
    })
  ),
  response: {
    200: postSchema,
  },
});
