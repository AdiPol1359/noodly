import type { preHandlerHookHandler } from 'fastify';

export const checkPost: preHandlerHookHandler = async (request, reply) => {
  const { params } = request;
  const { prisma } = request.server;
  const { userId } = request.session;

  if (!!params && typeof params === 'object' && 'id' in params) {
    const { id } = params as { id: number };

    try {
      await prisma.userPosts.findFirstOrThrow({ where: { id, userId } });
    } catch (err) {
      return reply.notFound('User post not found.');
    }
  }
};
