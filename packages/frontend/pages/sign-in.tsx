import Head from 'next/head';

import { SignInPageContent } from 'components/pages/SignInPageContent';
import { PrivateRoute } from 'components/shared/PrivateRoute';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Zaloguj się</title>
      </Head>

      <PrivateRoute loggedIn={false} path="/">
        <SignInPageContent />
      </PrivateRoute>
    </>
  );
}
