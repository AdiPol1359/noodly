import Link from 'next/link';

import { Button } from '@mui/material';

import type { ButtonProps } from '@mui/material';

export const LinkButton = ({ href, children, ...rest }: { href: string } & ButtonProps) => (
  <Link href={href}>
    <a style={{ textDecoration: 'none' }}>
      <Button {...rest}>{children}</Button>
    </a>
  </Link>
);
