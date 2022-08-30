import Head from 'next/head';

import { NotFoundPageContent } from 'components/pages/NotFoundPageContent';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Nie znaleziono strony</title>
      </Head>

      <NotFoundPageContent />
    </>
  );
}
