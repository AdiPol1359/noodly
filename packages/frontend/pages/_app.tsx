import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BaseLayout } from 'components/base/BaseLayout/BaseLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { DashboardLayout } from 'components/dashboard/DashboardLayout/DashboardLayout';
import { GlobalStyle } from 'components/GlobalStyle';

import type { AppProps } from 'next/app';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const Layout = pathname.startsWith('/dashboard') ? DashboardLayout : BaseLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
