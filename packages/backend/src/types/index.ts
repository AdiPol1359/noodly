import type {
  ContextConfigDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import type { RouteGenericInterface, RouteHandlerMethod } from 'fastify/types/route';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export type RouteHandlerMethodTypeBox<TSchema> = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>;
