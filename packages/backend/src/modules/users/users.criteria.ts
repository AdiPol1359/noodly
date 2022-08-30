import type { Prisma } from '@prisma/client';

export const searchUserCriteria = (search: string): Prisma.UserWhereInput => {
  const [name, lastName] = search.split(' ');

  return {
    OR: [
      { username: { contains: name } },
      { details: { OR: [{ firstName: { contains: name } }, { lastName: { contains: lastName } }] } },
    ],
  };
};
