import fp from 'fastify-plugin';
import fastifySession from '@fastify/session';

import type { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
  interface Session {
    userId: number;
  }
}

const sessionPlugin: FastifyPluginAsync = async (fastify) => {
  const { config } = fastify;

  await fastify.register(fastifySession, {
    cookieName: config.SESSION_COOKIE_NAME,
    secret: config.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: config.SESSION_COOKIE_EXPIRES,
      domain: config.SESSION_COOKIE_DOMAIN,
      sameSite: config.SESSION_COOKIE_SAME_SITE,
    },
  });
};

export default fp(sessionPlugin);
