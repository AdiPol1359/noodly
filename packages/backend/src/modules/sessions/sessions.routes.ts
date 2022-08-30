import { createSessionSchema, deleteSessionSchema, getSessionSchema } from '@noodly/common';
import { createSession, deleteSession, getSession } from './sessions.handlers';

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const sessionsRoutes: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.post('/', { schema: createSessionSchema }, createSession);
  fastify.get('/me', { schema: getSessionSchema, preHandler: fastify.auth }, getSession);
  fastify.delete('/me', { schema: deleteSessionSchema, preHandler: fastify.auth }, deleteSession);

  done();
};

export default sessionsRoutes;
