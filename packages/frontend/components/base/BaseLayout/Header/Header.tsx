import Link from 'next/link';

import { AppBar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { LOGIN_PAGE_PATH } from 'contants';
import { SearchInput } from './SearchInput';
import { UserProfileIcon } from './UserProfileIcon';
import { PrivateContent } from 'components/shared/PrivateContent';
import { LinkButton } from 'components/shared/LinkButton';

export const Header = () => (
  <AppBar position="static">
    <Box sx={{ alignItems: 'center', height: 75, px: 2, display: 'flex' }}>
      <Link href="/">
        <Typography
          component="a"
          sx={{ mr: 2, fontWeight: 500, fontSize: 18, cursor: 'pointer', display: { xs: 'none', sm: 'inline' } }}
        >
          🖊️ Noodly
        </Typography>
      </Link>

      <SearchInput />

      <Box component="nav" sx={{ ml: 1, gap: 0.5, display: { xs: 'none', sm: 'flex' } }}>
        <PrivateContent loggedIn={false}>
          <LinkButton href={LOGIN_PAGE_PATH} sx={{ color: '#fff' }}>
            logowanie
          </LinkButton>
        </PrivateContent>

        <LinkButton href="/rules" sx={{ color: '#fff' }}>
          regulamin
        </LinkButton>
      </Box>

      <UserProfileIcon />
    </Box>
  </AppBar>
);
