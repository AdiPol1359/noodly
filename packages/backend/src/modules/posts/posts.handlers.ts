import xss from 'xss';

import { userIncludes } from 'modules/users/users.data';
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

  return posts.map(mapUserPostToPost);
};

export const getPost: RouteHandlerMethodTypeBox<typeof getPostSchema> = async (request, reply) => {
  const { prisma } = request.server;
  const { id } = request.params;
  const { username } = request.query;

  const post = await prisma.userPosts.findFirst({
    where: { id, user: { username } },
    include: { user: { include: userIncludes } },
  });

  if (!post) {
    return reply.notFound('Post not found.');
  }

  return mapUserPostToPost(post);
};

export const createPost: RouteHandlerMethodTypeBox<typeof createPostSchema> = async (request, reply) => {
  const { server } = request;
  const { userId } = request.session;
  const { title, introduction, content } = request.body;

  const post = await server.prisma.userPosts.create({
    data: { userId, title, introduction, content: xss(content), updateDate: null },
    include: { user: { include: userIncludes } },
  });

  reply.status(201).send(mapUserPostToPost(post));
};

export const updatePost: RouteHandlerMethodTypeBox<typeof updatePostSchema> = async (request) => {
  const { server } = request;
  const { id } = request.params;
  const { title, introduction, content } = request.body;

  const post = await server.prisma.userPosts.update({
    where: { id },
    data: { title, introduction, content: content && xss(content) },
    include: { user: { include: userIncludes } },
  });

  return mapUserPostToPost(post);
};

export const deletePost: RouteHandlerMethodTypeBox<typeof deletePostSchema> = async (request) => {
  const { server } = request;
  const { id } = request.params;

  const post = await server.prisma.userPosts.delete({
    where: { id },
    include: { user: { include: userIncludes } },
  });

  return mapUserPostToPost(post);
};
