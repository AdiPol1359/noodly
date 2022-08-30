import BottomNav from '@mui/material/BottomNavigation';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';

import { useRouter } from 'next/router';
import { BottomNavigationAction, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useUser } from 'hooks/useUser';

const navigationItems = [
  { title: 'Strona główna', icon: <HomeIcon />, path: '/' },
  { title: 'Logowanie', icon: <AccountCircleIcon />, path: '/sign-in', loggedIn: false },
  { title: 'Regualmin', icon: <ArticleIcon />, path: '/rules' },
];

export const BottomNavigation = () => {
  const router = useRouter();

  const { data } = useUser();

  const index = navigationItems.findIndex(({ path }) => path === router.pathname);

  return (
    <Box sx={{ position: 'fixed', width: '100%', bottom: 0, display: { xs: 'block', sm: 'none' } }}>
      <BottomNav showLabels value={index} sx={{ bgcolor: grey[900] }}>
        {navigationItems.map(
          ({ title, icon, path, loggedIn }) =>
            (loggedIn === undefined ? true : !!data === loggedIn) && (
              <BottomNavigationAction key={path} label={title} icon={icon} onClick={() => router.push(path)} />
            )
        )}
      </BottomNav>
    </Box>
  );
};
