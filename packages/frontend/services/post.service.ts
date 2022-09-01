import { axiosWrapper } from 'lib/axios';

import type { createPostSchema, getPostSchema, getPostsSchema, updatePostSchema } from '@noodly/common';
import type { InferBody, InferQuery } from 'types';

export const getAllPosts = async (query?: InferQuery<typeof getPostsSchema>) => {
  const { data } = await axiosWrapper.get<typeof getPostsSchema>(`/posts?${new URLSearchParams(query).toString()}`);
  return data;
};

export const getPost = async (uuid: string, query?: InferQuery<typeof getPostSchema>) => {
  const { data } = await axiosWrapper.get<typeof getPostSchema>(
    `/posts/${uuid}?${new URLSearchParams(query).toString()}`
  );
  return data;
};

export const createPost = async (body: InferBody<typeof createPostSchema>) => {
  const { data } = await axiosWrapper.post<typeof createPostSchema>('/posts', body);
  return { data };
};

export const updatePost = async ({ uuid, body }: { uuid: string; body: InferBody<typeof updatePostSchema> }) => {
  await axiosWrapper.patch<typeof updatePostSchema>(`/posts/${uuid}`, body);
};

export const deletePost = async (uuid: string) => {
  await axiosWrapper.delete(`/posts/${uuid}`);
};
