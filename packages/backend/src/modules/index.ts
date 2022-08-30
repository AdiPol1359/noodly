import type { FastifyPluginAsync } from 'fastify';

const modulesPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(import('./sessions'));
  await fastify.register(import('./posts'), { prefix: '/posts' });
  await fastify.register(import('./users'));
};

export default modulesPlugin;
