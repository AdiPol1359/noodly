import { Box, Typography } from '@mui/material';
import { LinkButton } from 'components/shared/LinkButton';

export const NotFoundPageContent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="h1" sx={{ color: '#fff' }}>
      404
    </Typography>
    <Typography variant="h6" sx={{ color: '#fff', mb: 2, textAlign: 'center' }}>
      Strona na której aktualnie się znajdujesz nie istnieje.
    </Typography>
    <LinkButton href="/" variant="contained">
      Zabierz mnie stąd
    </LinkButton>
  </Box>
);
