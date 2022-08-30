import type { preHandlerHookHandler } from 'fastify';

export const checkPostPreHander: preHandlerHookHandler = async (request, reply) => {
  const { params } = request;
  const { prisma } = request.server;
  const { userId } = request.session;

  if (!!params && typeof params === 'object' && 'uuid' in params) {
    const { uuid } = params as { uuid: string };

    try {
      await prisma.userPosts.findFirstOrThrow({ where: { userId, uuid } });
    } catch (err) {
      return reply.notFound('User post not found.');
    }
  }
};
