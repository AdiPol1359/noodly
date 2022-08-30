import type { FastifySchemaTypeBox } from './types';

export const createFastifySchema = <T extends FastifySchemaTypeBox>(schema: T) => schema;
