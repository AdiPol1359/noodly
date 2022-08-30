import MenuIcon from '@mui/icons-material/Menu';

import { IconButton, Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = Readonly<{
  onClick: () => void;
}>;

export const DashboardToolbar = ({ onClick }: Props) => (
  <Toolbar
    sx={{ position: 'fixed', width: '100%', zIndex: 100, bgcolor: grey[900], display: { xs: 'flex', md: 'none' } }}
  >
    <IconButton onClick={onClick}>
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" sx={{ ml: 1.2 }}>
      Nooldy Dashboard
    </Typography>
  </Toolbar>
);
