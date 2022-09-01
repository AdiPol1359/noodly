import Head from 'next/head';

import { getPost } from 'services/post.service';
import { UserPostPageContent } from 'components/pages/user/UserPostPageContent';

import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string; id: string }>) => {
  const username = params?.slug;
  const id = params?.id;

  try {
    const post = await getPost(Number(id), { username });

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
