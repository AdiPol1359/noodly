import fp from 'fastify-plugin';
import fastifyCors from '@fastify/cors';

import type { FastifyPluginAsync } from 'fastify';

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyCors, {
    origin: fastify.config.CORS_ORIGIN,
    credentials: true,
  });
};

export default fp(corsPlugin);
