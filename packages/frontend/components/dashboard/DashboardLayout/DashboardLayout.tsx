import { useState } from 'react';
import { PrivateRoute } from 'components/shared/PrivateRoute';
import { LOGIN_PAGE_PATH } from 'contants';
import { AsideMenu, DRAWER_WIDTH } from './AsideMenu';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { PageTitle } from '../PageTitle';
import { DashboardToolbar } from './DashboardToolbar';

import type { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
}>;

const titleData = [
  { title: 'Twoje posty', path: '/dashboard/posts' },
  { title: 'Stwórz posta', path: '/dashboard/posts/add' },
  { title: 'Edytuj posta', path: '/dashboard/posts/edit/[slug]' },
  { title: 'Ustawienia konta', path: '/dashboard/account' },
];

export const DashboardLayout = ({ children }: Props) => {
  const { pathname } = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pageTitle = titleData.find(({ path }) => path === pathname);

  return (
    <PrivateRoute path={LOGIN_PAGE_PATH}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <DashboardToolbar onClick={() => setIsMenuOpen(true)} />
        <AsideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <Box
          sx={{
            width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH})` },
            overflow: 'auto',
            p: { xs: '79px 15px 15px 15px', md: '48px' },
          }}
        >
          {pageTitle && <PageTitle title={pageTitle.title} />}
          {children}
        </Box>
      </Box>
    </PrivateRoute>
  );
};
