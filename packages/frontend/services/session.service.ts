import { axiosWrapper } from 'lib/axios';

import type { createSessionSchema, getSessionSchema } from '@noodly/common';
import type { InferBody } from 'types';

export const createSession = async (body: InferBody<typeof createSessionSchema>) => {
  const { data } = await axiosWrapper.post<typeof createSessionSchema>('/sessions', body);
  return data;
};

export const getSession = async () => {
  const { data } = await axiosWrapper.get<typeof getSessionSchema>('/sessions/me');
  return data;
};

export const deleteSession = async () => {
  await axiosWrapper.delete('/sessions/me');
  return null;
};
