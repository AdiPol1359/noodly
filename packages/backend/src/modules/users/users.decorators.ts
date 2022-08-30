import fp from 'fastify-plugin';

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';
import type { User } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    findUserByEmailOrUsername: (where: { email?: string; username?: string }) => User | null;
  }
}

const usersDecorators: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.decorate('findUserByEmailOrUsername', async ({ email, username }: { email?: string; username?: string }) => {
    return await fastify.prisma.user.findFirst({
      where: { OR: [{ email: { equals: email } }, { username: { equals: username } }] },
    });
  });

  done();
};

export default fp(usersDecorators);
