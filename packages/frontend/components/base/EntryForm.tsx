import NextLink from 'next/link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Avatar, Button, Link, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

import type { FormHTMLAttributes, ReactNode } from 'react';

type Props = Readonly<{
  title: string;
  leftText: string;
  leftPath: string;
  rightText: string;
  rightPath: string;
  children: ReactNode;
}> &
  FormHTMLAttributes<HTMLFormElement>;

export const EntryForm = ({ title, leftText, rightText, leftPath, rightPath, children, ...rest }: Props) => (
  <Container maxWidth="xs">
    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h6">{title}</Typography>
    </Box>

    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} {...rest}>
      {children}

      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        {title}
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <NextLink href={leftPath}>
          <Link href={leftPath}>{leftText}</Link>
        </NextLink>
        <NextLink href={rightPath}>
          <Link href={rightPath} sx={{ textAlign: 'right' }}>
            {rightText}
          </Link>
        </NextLink>
      </Box>
    </Box>
  </Container>
);
