import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const usersPlugin: FastifyPluginAsyncTypebox = async (fastify) => {
  await fastify.register(import('./users.decorators'));
  await fastify.register(import('./users.routes'), { prefix: '/users' });
};

export default usersPlugin;
