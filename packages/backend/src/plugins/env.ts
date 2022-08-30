import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';

import { Type } from '@sinclair/typebox';

import type { Static } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';

const schema = Type.Object({
  HOST: Type.String({ default: 'localhost' }),
  PORT: Type.Number({ default: 8080 }),
  SALT_OR_ROUNDS: Type.Union([Type.Number(), Type.String()], { default: 10 }),
  CORS_ORIGIN: Type.String({ default: 'http://localhost:3000' }),
  SWAGGER_HOST: Type.String({ default: 'localhost:8080' }),
  SESSION_SECRET: Type.String({ default: 'NPMTB1kv54qcKVEdJj0tvsS760RmkDlL' }),
  SESSION_COOKIE_NAME: Type.String({ default: 'sessionId' }),
  SESSION_COOKIE_EXPIRES: Type.Number({ default: 1200000 }),
});

declare module 'fastify' {
  interface FastifyInstance {
    config: Static<typeof schema>;
  }
}

const envPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyEnv, {
    schema,
    dotenv: true,
  });
};

export default fp(envPlugin);
