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
  const { config } = fastify;

  await fastify.register(fastifySession, {
    cookieName: config.SESSION_COOKIE_NAME,
    secret: config.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: config.SESSION_COOKIE_EXPIRES,
      domain: config.SESSION_COOKIE_DOMAIN,
      sameSite: config.SESSION_COOKIE_SAME_SITE,
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
