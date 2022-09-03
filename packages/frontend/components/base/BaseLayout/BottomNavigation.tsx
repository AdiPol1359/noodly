import BottomNav from '@mui/material/BottomNavigation';

import { useRouter } from 'next/router';
import { BottomNavigationAction, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useUser } from 'hooks/useUser';
import { bottomNavigationItems } from 'data/navigation';

export const BottomNavigation = () => {
  const router = useRouter();

  const { data } = useUser();

  const index = bottomNavigationItems.findIndex(({ path }) => path === router.pathname);

  return (
    <Box sx={{ position: 'fixed', width: '100%', bottom: 0, display: { xs: 'block', sm: 'none' } }}>
      <BottomNav showLabels value={index} sx={{ bgcolor: grey[900] }}>
        {bottomNavigationItems.map(
          ({ title, icon: Icon, path, loggedIn }) =>
            (loggedIn === undefined ? true : !!data === loggedIn) && (
              <BottomNavigationAction key={path} label={title} icon={<Icon />} onClick={() => router.push(path)} />
            )
        )}
      </BottomNav>
    </Box>
  );
};
