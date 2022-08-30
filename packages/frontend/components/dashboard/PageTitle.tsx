import { Typography } from '@mui/material';

import type { ReactNode } from 'react';

export const PageTitle = ({ title }: { title: ReactNode }) => (
  <Typography variant="h4" sx={{ fontWeight: 500, mb: 5 }}>
    {title}
  </Typography>
);
