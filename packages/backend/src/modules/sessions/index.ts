import fp from 'fastify-plugin';

import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const sessionsPlugin: FastifyPluginAsyncTypebox = async (fastify) => {
  await fastify.register(import('./sessions.plugin'));
  await fastify.register(import('./sessions.routes'), { prefix: '/sessions' });
};

export default fp(sessionsPlugin);
