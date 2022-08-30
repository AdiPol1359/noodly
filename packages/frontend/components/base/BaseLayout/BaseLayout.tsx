import { Header } from './Header/Header';
import { Footer } from './Footer';
import { Box } from '@mui/material';
import { BottomNavigation } from './BottomNavigation';

import type { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
}>;

export const BaseLayout = ({ children }: Props) => (
  <>
    <Header />
    <Box sx={{ py: 6 }}>{children}</Box>
    <Footer />
    <BottomNavigation />
  </>
);
