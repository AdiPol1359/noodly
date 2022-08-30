import type { Static } from '@sinclair/typebox';
import type { userSchema } from './users.schemas';

export type User = Static<typeof userSchema>;
