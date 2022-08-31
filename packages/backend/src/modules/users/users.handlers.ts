import bcrypt from 'bcrypt';

import { searchUserCriteria } from './users.criteria';
import { capitalizeFirstLetter } from 'utils/string';
import { userIncludes } from './users.data';

import type { RouteHandlerMethodTypeBox } from 'types';
import type {
  handleUserFollowSchema,
  createUserSchema,
  getUserFollowsSchema,
  getUsersSchema,
  getUserStatisticsSchema,
  getUserFollowSchema,
  updateUserSchema,
} from '@noodly/common';

export const getUsers: RouteHandlerMethodTypeBox<typeof getUsersSchema> = async (request) => {
  const { prisma } = request.server;
  const { username, firstName, lastName, search } = request.query;

  return await prisma.user.findMany({
    where: {
      username,
      details: { firstName, lastName },
      ...(search && searchUserCriteria(search)),
    },
    take: 10,
    include: userIncludes,
    orderBy: { id: 'desc' },
  });
};

export const createUser: RouteHandlerMethodTypeBox<typeof createUserSchema> = async (request, reply) => {
  const { server } = request;
  const { prisma } = server;
  const { fullName, username, email, password } = request.body;

  const [firstName, lastName] = fullName.trim().split(' ').map(capitalizeFirstLetter);

  if (await server.findUserByEmailOrUsername({ email, username })) {
    return reply.conflict('User already exists.');
  }

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: await bcrypt.hash(password, server.config.SALT_OR_ROUNDS),
      details: {
        create: {
          firstName,
          lastName,
        },
      },
      profile: {
        create: {
          description: 'No biography yet.',
        },
      },
    },
    include: userIncludes,
  });

  reply.code(201).send(user);
};

export const updateUser: RouteHandlerMethodTypeBox<typeof updateUserSchema> = async (request, reply) => {
  const { server } = request;
  const { prisma } = server;
  const { userId } = request.params;
  const { fullName, email, username, password, description } = request.body;

  const name = fullName && fullName.trim().split(' ').map(capitalizeFirstLetter);

  if (await server.findUserByEmailOrUsername({ email, username })) {
    return reply.conflict('User already exists.');
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      email,
      username,
      password: password && (await bcrypt.hash(password, server.config.SALT_OR_ROUNDS)),
      details: { update: name && { firstName: name[0], lastName: name[1] || null } },
      profile: { update: { description } },
    },
    include: userIncludes,
  });
};

export const handleUserFollow =
  (action: 'follow' | 'unfollow'): RouteHandlerMethodTypeBox<typeof handleUserFollowSchema> =>
  async (request, reply) => {
    const { prisma } = request.server;
    const { userId, followId } = request.params;

    if (userId === followId) {
      reply.badRequest(`You can not ${action} yourself.`);
    }

    try {
      if (action === 'follow') {
        await prisma.usersFollows.create({ data: { followerId: userId, followingId: followId } });
      } else {
        await prisma.usersFollows.delete({
          where: { followerId_followingId: { followerId: userId, followingId: followId } },
        });
      }

      reply.status(204).send();
    } catch (err) {
      reply.conflict(`You are ${action === 'follow' ? 'already' : 'not'} follow this user.`);
    }
  };

export const getUserFollows =
  (type: 'followers' | 'followings'): RouteHandlerMethodTypeBox<typeof getUserFollowsSchema> =>
  async (request) => {
    const { prisma } = request.server;
    const { userId } = request.params;

    const data = await prisma.usersFollows.findMany({
      where: type === 'followers' ? { followingId: userId } : { followerId: userId },
      include: {
        follower: { include: userIncludes },
        following: { include: userIncludes },
      },
    });

    return data.map(({ follower, following }) => (type === 'followers' ? follower : following));
  };

export const getUserFollow: RouteHandlerMethodTypeBox<typeof getUserFollowSchema> = async (request, reply) => {
  const { prisma } = request.server;
  const { userId, followId } = request.params;

  try {
    const { following } = await prisma.usersFollows.findFirstOrThrow({
      where: { follower: { id: userId }, following: { id: followId } },
      include: { following: { include: userIncludes } },
    });

    return following;
  } catch (err) {
    return reply.notFound('You are not follow this user.');
  }
};

export const getUserStatistics: RouteHandlerMethodTypeBox<typeof getUserStatisticsSchema> = async (request, reply) => {
  const { prisma } = request.server;
  const { userId } = request.params;

  try {
    const { _count } = await prisma.user.findFirstOrThrow({
      where: { id: userId },
      include: { _count: { select: { posts: true, followers: true, following: true } } },
    });

    return _count;
  } catch (err) {
    reply.notFound('User not found.');
  }
};
