import type { Post } from '@noodly/common';
import type { User, UserDetails, UserPosts, UserProfile } from '@prisma/client';

type UserPost = UserPosts & {
  user: User & {
    details: UserDetails;
    profile: UserProfile;
  };
};

export const mapUserPostToPost = ({ creationDate, updateDate, user: author, ...rest }: UserPost): Post => ({
  creationDate: creationDate.getTime(),
  updateDate: updateDate && updateDate.getTime(),
  author,
  ...rest,
});
