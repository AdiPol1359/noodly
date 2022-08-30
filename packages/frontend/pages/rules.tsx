import Head from 'next/head';

import { RulesPageContent } from 'components/pages/RulesPageContent';

export default function RulesPage() {
  return (
    <>
      <Head>
        <title>Regulamin serwisu</title>
      </Head>

      <RulesPageContent />
    </>
  );
}
