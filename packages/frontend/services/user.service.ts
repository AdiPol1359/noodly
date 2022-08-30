import { axiosWrapper } from 'lib/axios';

import type {
  createUserSchema,
  getUserFollowSchema,
  getUserFollowsSchema,
  getUsersSchema,
  getUserStatisticsSchema,
  updateUserSchema,
} from '@noodly/common';
import type { InferBody, InferQuery } from 'types';

export const createUser = async (body: InferBody<typeof createUserSchema>) => {
  const { data } = await axiosWrapper.post<typeof createUserSchema>('/users', body);
  return data;
};

export const updateUser = async ({ userId, body }: { userId: number; body: InferBody<typeof updateUserSchema> }) => {
  const { data } = await axiosWrapper.patch<typeof updateUserSchema>(`/users/${userId}`, body);
  return data;
};

export const getUsers = async (query: InferQuery<typeof getUsersSchema>) => {
  const { data } = await axiosWrapper.get<typeof getUsersSchema>(`/users?${new URLSearchParams(query).toString()}`);
  return data;
};

export const getUserFollowers = async (userId: number) => {
  const { data } = await axiosWrapper.get<typeof getUserFollowsSchema>(`/users/${userId}/followers`);
  return data;
};

export const getUserFollowings = async (userId: number) => {
  const { data } = await axiosWrapper.get<typeof getUserFollowsSchema>(`/users/${userId}/followings`);
  return data;
};

export const getUserFollow = async (userId: number, followId: number) => {
  const { data } = await axiosWrapper.get<typeof getUserFollowSchema>(`/users/${userId}/follows/${followId}`);
  return data;
};

export const createUserFollow = async (userId: number, followId: number) => {
  const { data } = await axiosWrapper.post(`/users/${userId}/follows/${followId}`);
  return data;
};

export const deleteUserFollow = async (userId: number, followId: number) => {
  await axiosWrapper.delete(`/users/${userId}/follows/${followId}`);
};

export const getUserStatistics = async (userId: number) => {
  const { data } = await axiosWrapper.get<typeof getUserStatisticsSchema>(`/users/${userId}/statistics`);
  return data;
};
