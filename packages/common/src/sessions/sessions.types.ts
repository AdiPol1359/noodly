import type { Static } from '@sinclair/typebox';
import type { sessionSchema } from './sessions.schemas';

export type Session = Static<typeof sessionSchema>;
