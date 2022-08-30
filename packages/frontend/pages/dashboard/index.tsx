import Head from 'next/head';

import { DashboardIndexPageContent } from 'components/pages/dashboard/DashboardIndexPageContent';

export default function DashboardIndexPage() {
  return (
    <>
      <Head>
        <title>Pulpit</title>
      </Head>

      <DashboardIndexPageContent />
    </>
  );
}
