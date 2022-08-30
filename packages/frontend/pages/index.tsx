import Head from 'next/head';

import { IndexPageContent } from 'components/pages/IndexPageContent';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Strona główna</title>
      </Head>

      <IndexPageContent />
    </>
  );
}
