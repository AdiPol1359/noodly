import Link from 'next/link';

import { AuthContent } from 'components/base/AuthContent';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useUser } from 'hooks/useUser';

type ItemProps = Readonly<{
  title: string;
}>;

const Item = ({ title, onClick }: ItemProps & { onClick: () => void }) => (
  <MenuItem onClick={onClick}>
    <Typography textAlign="center">{title}</Typography>
  </MenuItem>
);

const LinkItem = ({ title, href }: ItemProps & { href: string }) => (
  <Link href={href}>
    <MenuItem component="a">
      <Typography textAlign="center">{title}</Typography>
    </MenuItem>
  </Link>
);

export const UserProfileIcon = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data, logoutMutation } = useUser();

  const handleLogoutClick = () => {
    logoutMutation.mutate();
    setAnchorEl(null);
  };

  return (
    <AuthContent>
      <Box sx={{ ml: 1 }}>
        <IconButton sx={{ p: 0 }} onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
          <Avatar>{data?.details.firstName.charAt(0)}</Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
          <LinkItem title="Panel" href="/dashboard" />
          <LinkItem title="Ustawienia" href="/dashboard/account" />
          <Item title="Wyloguj się" onClick={handleLogoutClick} />
        </Menu>
      </Box>
    </AuthContent>
  );
};
