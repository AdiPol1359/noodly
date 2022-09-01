import { axiosWrapper } from 'lib/axios';

import type { createPostSchema, getPostSchema, getPostsSchema, updatePostSchema } from '@noodly/common';
import type { InferBody, InferQuery } from 'types';

export const getAllPosts = async (query?: InferQuery<typeof getPostsSchema>) => {
  const { data } = await axiosWrapper.get<typeof getPostsSchema>(`/posts?${new URLSearchParams(query).toString()}`);
  return data;
};

export const getPost = async (id: number, query?: InferQuery<typeof getPostSchema>) => {
  const { data } = await axiosWrapper.get<typeof getPostSchema>(
    `/posts/${id}?${new URLSearchParams(query).toString()}`
  );
  return data;
};

export const createPost = async (body: InferBody<typeof createPostSchema>) => {
  const { data } = await axiosWrapper.post<typeof createPostSchema>('/posts', body);
  return { data };
};

export const updatePost = async ({ id, body }: { id: number; body: InferBody<typeof updatePostSchema> }) => {
  await axiosWrapper.patch<typeof updatePostSchema>(`/posts/${id}`, body);
};

export const deletePost = async (id: number) => {
  await axiosWrapper.delete(`/posts/${id}`);
};
