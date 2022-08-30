import Head from 'next/head';

import { getPost } from 'services/post.services';
import { UserPostPageContent } from 'components/pages/user/UserPostPageContent';

import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string; uuid: string }>) => {
  const username = params?.slug;
  const uuid = params?.uuid;

  try {
    const post = await getPost(uuid!, { username });

    return {
      props: { post },
      revalidate: 10,
    };
  } catch (err) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export default function UserPostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`${post?.title}`}</title>
      </Head>

      <UserPostPageContent post={post!} />
    </>
  );
}
