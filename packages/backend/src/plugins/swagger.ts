import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';

import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const swaggerPlugin: FastifyPluginAsyncTypebox = async (fastify) => {
  await fastify.register(fastifySwagger, {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      host: fastify.config.SWAGGER_HOST,
      basePath: '/api',
      schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      info: {
        title: 'Nooodly API',
        description: 'Testing the Noodly API',
        version: '0.1.0',
      },
    },
  });
};

export default fp(swaggerPlugin);
