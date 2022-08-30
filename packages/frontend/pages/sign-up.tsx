import Head from 'next/head';

import { SignUpPageContent } from 'components/pages/SignUpPageContent';
import { PrivateRoute } from 'components/shared/PrivateRoute';

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Zarejestruj się</title>
      </Head>

      <PrivateRoute loggedIn={false} path="/dashboard">
        <SignUpPageContent />
      </PrivateRoute>
    </>
  );
}
