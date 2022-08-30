import fp from 'fastify-plugin';
import fastifySession from '@fastify/session';

import { userIncludes } from 'modules/users/users.data';

import type { FastifyPluginAsync, preHandlerHookHandler } from 'fastify';
import type { User, UserDetails, UserProfile } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    auth: preHandlerHookHandler;
  }

  interface FastifyRequest {
    user: User & { details: UserDetails; profile: UserProfile };
  }

  interface Session {
    userId: number;
  }
}

const sessionPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifySession, {
    cookieName: fastify.config.SESSION_COOKIE_NAME,
    secret: fastify.config.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: fastify.config.SESSION_COOKIE_EXPIRES,
    },
  });

  fastify.decorate<preHandlerHookHandler>('auth', async (request, reply) => {
    const { params } = request;
    const { userId } = request.session;
    const { prisma } = request.server;

    if (!userId) {
      return reply.unauthorized('Unauthorized.');
    }

    if (
      !!params &&
      typeof params === 'object' &&
      'userId' in params &&
      (<{ userId: number }>params).userId !== userId
    ) {
      return reply.badRequest('Incorrect user id.');
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: userIncludes,
    });

    request.user = user;
  });
};

export default fp(sessionPlugin);
