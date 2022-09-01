import Head from 'next/head';

import { getUsers } from 'services/user.service';
import { UserProfilePageContent } from 'components/pages/user/UserProfilePageContent';
import { getAllPosts } from 'services/post.service';

import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
  const username = params?.slug;
  const [user] = await getUsers({ username });

  if (!user) {
    return {
      props: {},
      notFound: true,
    };
  }

  const posts = await getAllPosts({ username: user.username });

  return {
    props: { user, posts },
    revalidate: 10,
  };
};

export default function UserProfilePage({ user, posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`Profil użytkownika ${user?.username}`}</title>
      </Head>

      <UserProfilePageContent user={user!} posts={posts!} />
    </>
  );
}
