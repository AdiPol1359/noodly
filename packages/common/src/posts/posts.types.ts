import type { Static } from '@sinclair/typebox';
import type { postSchema } from './posts.schemas';

export type Post = Static<typeof postSchema>;
