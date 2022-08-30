import Head from 'next/head';

import { DashboardAddPostPageContent } from 'components/pages/dashboard/posts/DashboardAddPostPageContent';

export default function DashboardAddPostPage() {
  return (
    <>
      <Head>
        <title>Stwórz posta</title>
      </Head>

      <DashboardAddPostPageContent />
    </>
  );
}
