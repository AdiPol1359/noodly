import crypto from 'node:crypto';

import { userIncludes } from 'modules/users/users.data';
import { createOrUpdatePost, getPostByUuid, deletePostByUuid } from './posts.model';
import { mapUserPostToPost } from './posts.mappers';

import type {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  getPostsSchema,
  updatePostSchema,
} from '@noodly/common';
import type { RouteHandlerMethodTypeBox } from 'types';

export const getPosts: RouteHandlerMethodTypeBox<typeof getPostsSchema> = async (request) => {
  const { prisma } = request.server;
  const { username } = request.query;

  const posts = await prisma.userPosts.findMany({
    where: { user: { username } },
    include: { user: { include: userIncludes } },
    take: 10,
    orderBy: { creationDate: 'desc' },
  });

  return posts.map((post) => mapUserPostToPost(post));
};

export const getPost: RouteHandlerMethodTypeBox<typeof getPostSchema> = async (request, reply) => {
  const { prisma } = request.server;
  const { uuid } = request.params;
  const { username } = request.query;

  const post = await prisma.userPosts.findFirst({
    where: { uuid, user: { username } },
    include: { user: { include: userIncludes } },
  });

  if (!post) {
    return reply.notFound('Post not found.');
  }

  const content = await getPostByUuid(uuid);

  return mapUserPostToPost(post, content);
};

export const createPost: RouteHandlerMethodTypeBox<typeof createPostSchema> = async (request, reply) => {
  const { server } = request;
  const { userId } = request.session;
  const { title, introduction, content } = request.body;

  const uuid = crypto.randomBytes(8).toString('hex');

  await createOrUpdatePost(uuid, content);

  const post = await server.prisma.userPosts.create({
    data: { userId, uuid, title, introduction, updateDate: null },
    include: { user: { include: userIncludes } },
  });

  reply.status(201).send(mapUserPostToPost(post, content));
};

export const updatePost: RouteHandlerMethodTypeBox<typeof updatePostSchema> = async (request, reply) => {
  const { server } = request;
  const { userId } = request.session;
  const { uuid } = request.params;
  const { title, introduction, content } = request.body;

  await server.prisma.userPosts.updateMany({
    where: { userId, uuid },
    data: { title, introduction },
  });

  if (content) {
    await createOrUpdatePost(uuid, content);
  }

  reply.status(204).send();
};

export const deletePost: RouteHandlerMethodTypeBox<typeof deletePostSchema> = async (request, reply) => {
  const { server } = request;
  const { userId } = request.session;
  const { uuid } = request.params;

  await server.prisma.userPosts.deleteMany({ where: { userId, uuid } });
  await deletePostByUuid(uuid);

  reply.status(204).send();
};
