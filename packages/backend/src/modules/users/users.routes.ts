import {
  handleUserFollowSchema,
  createUserSchema,
  getUserFollowSchema,
  getUserFollowsSchema,
  getUsersSchema,
  getUserStatisticsSchema,
  updateUserSchema,
} from '@noodly/common';
import {
  createUser,
  handleUserFollow,
  getUserFollow,
  getUserFollows,
  getUsers,
  getUserStatistics,
  updateUser,
} from './users.handlers';

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const usersPlugin: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.get('/', { schema: getUsersSchema }, getUsers);
  fastify.post('/', { schema: createUserSchema }, createUser);
  fastify.patch('/:userId', { schema: updateUserSchema, preHandler: fastify.auth }, updateUser);
  fastify.post(
    '/:userId/follows/:followId',
    { schema: handleUserFollowSchema, preHandler: fastify.auth },
    handleUserFollow('follow')
  );
  fastify.delete(
    '/:userId/follows/:followId',
    { schema: handleUserFollowSchema, preHandler: fastify.auth },
    handleUserFollow('unfollow')
  );
  fastify.get('/:userId/followers', { schema: getUserFollowsSchema }, getUserFollows('followers'));
  fastify.get('/:userId/followings', { schema: getUserFollowsSchema }, getUserFollows('followings'));
  fastify.get('/:userId/follows/:followId', { schema: getUserFollowSchema }, getUserFollow);
  fastify.get('/:userId/statistics', { schema: getUserStatisticsSchema }, getUserStatistics);

  done();
};

export default usersPlugin;
