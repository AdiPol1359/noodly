import Head from 'next/head';

import { DashboardAccountPageContent } from 'components/pages/dashboard/DashboardAccountPageContent';

export default function DashboardAccountPage() {
  return (
    <>
      <Head>
        <title>Ustawienia konta</title>
      </Head>

      <DashboardAccountPageContent />
    </>
  );
}
