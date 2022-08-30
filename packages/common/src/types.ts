import type { FastifySchema } from 'fastify';
import type { TSchema } from '@sinclair/typebox';

export type FastifySchemaTypeBox = {
  [key in keyof Omit<FastifySchema, 'response'>]: TSchema;
} & { response?: { [key: number]: TSchema } };
