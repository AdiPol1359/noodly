import Head from 'next/head';

import { DashboardEditPostPageContent } from 'components/pages/dashboard/posts/DashboardEditPostPageContent';

export default function DashboardEditPostPage() {
  return (
    <>
      <Head>
        <title>Edytuj posta</title>
      </Head>

      <DashboardEditPostPageContent />
    </>
  );
}
