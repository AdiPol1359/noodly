import fp from 'fastify-plugin';

import { userIncludes } from 'modules/users/users.data';

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';
import type { preHandlerHookHandler } from 'fastify';
import type { User, UserDetails, UserProfile } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    auth: preHandlerHookHandler;
  }

  interface FastifyRequest {
    user: User & { details: UserDetails; profile: UserProfile };
  }
}

const sessionsDecoratos: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.decorateRequest('user', null);

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

  done();
};

export default fp(sessionsDecoratos);
