import Head from 'next/head';

import { DashboardPostsPageContent } from 'components/pages/dashboard/posts/DashboardPostsPageContent';

export default function DashboardPostsPage() {
  return (
    <>
      <Head>
        <title>Twoje posty</title>
      </Head>

      <DashboardPostsPageContent />
    </>
  );
}
