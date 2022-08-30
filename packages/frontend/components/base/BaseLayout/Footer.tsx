import { Link } from '@mui/material';
import { Box } from '@mui/system';

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      fontSize: 13.5,
      p: 3,
      mb: { xs: '56px', sm: 0 },
      bgcolor: 'divider',
      textAlign: 'center',
    }}
  >
    ❤️ &copy; 2022 NOODLY - All rights reserved ❤️
    <Link
      href="https://github.com/AdiPol1359"
      underline="hover"
      target="_blank"
      rel="noreferrer"
      color="#fff"
      fontWeight="700"
    >
      AdiPol1359
    </Link>
  </Box>
);
