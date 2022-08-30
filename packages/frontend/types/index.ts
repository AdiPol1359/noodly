import type { FastifySchemaTypeBox } from '@noodly/common';
import type { Static, TSchema } from '@sinclair/typebox';

export type ApiError = {
  statusCode: number;
  error: string;
  message: string;
};

export type InferBody<T extends FastifySchemaTypeBox> = T['body'] extends TSchema ? Static<T['body']> : never;

export type InferQuery<T extends FastifySchemaTypeBox> = T['querystring'] extends TSchema
  ? Static<T['querystring']>
  : never;

export type InferParams<T extends FastifySchemaTypeBox> = T['params'] extends TSchema ? Static<T['params']> : never;

export type InferResponse<T extends FastifySchemaTypeBox> = T['response'][keyof T['response']] extends TSchema
  ? Static<T['response'][keyof T['response']]>
  : never;
