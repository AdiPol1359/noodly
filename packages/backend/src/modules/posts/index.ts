import { createPostSchema, deletePostSchema, getPostSchema, getPostsSchema, updatePostSchema } from '@noodly/common';
import { createPost, deletePost, getPost, getPosts, updatePost } from './posts.handlers';
import { checkPost } from './posts.hooks';

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const postsPlugin: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.get('/', { schema: getPostsSchema }, getPosts);
  fastify.get('/:id', { schema: getPostSchema }, getPost);
  fastify.post('/', { schema: createPostSchema, preHandler: fastify.auth }, createPost);
  fastify.patch('/:id', { schema: updatePostSchema, preHandler: [fastify.auth, checkPost] }, updatePost);
  fastify.delete('/:id', { schema: deletePostSchema, preHandler: [fastify.auth, checkPost] }, deletePost);

  done();
};

export default postsPlugin;
