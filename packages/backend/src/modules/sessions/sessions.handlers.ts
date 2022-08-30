import bcrypt from 'bcrypt';

import { userIncludes } from 'modules/users/users.data';

import type { createSessionSchema, deleteSessionSchema, getSessionSchema } from '@noodly/common';
import type { RouteHandlerMethodTypeBox } from 'types';

export const createSession: RouteHandlerMethodTypeBox<typeof createSessionSchema> = async (request, reply) => {
  const { prisma } = request.server;
  const { email, password } = request.body;

  if (request.session.userId) {
    return reply.notAcceptable('You are already logged in!');
  }

  const user = await prisma.user.findFirst({
    where: { email },
    include: userIncludes,
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.notFound('Incorrect email or password.');
  }

  request.session.userId = user.id;

  return user;
};

export const getSession: RouteHandlerMethodTypeBox<typeof getSessionSchema> = (request) => {
  return request.user;
};

export const deleteSession: RouteHandlerMethodTypeBox<typeof deleteSessionSchema> = (request, reply) => {
  const { SESSION_COOKIE_NAME } = request.server.config;

  request.session.destroy(() => {
    reply.clearCookie(SESSION_COOKIE_NAME).code(204).send();
  });
};
