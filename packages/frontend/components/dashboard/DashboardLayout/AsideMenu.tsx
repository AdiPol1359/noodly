import Link from 'next/link';

import { Fragment } from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouteChange } from 'hooks/useRouteChange';
import { asideNavigationItems } from 'data/navigation';

import type { Theme } from '@mui/material';

export const DRAWER_WIDTH = '250px';

type Props = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export const AsideMenu = ({ isOpen, onClose }: Props) => {
  const isPermament = useMediaQuery<Theme>(({ breakpoints }) => breakpoints.up('md'));

  useRouteChange(onClose);

  return (
    <Box component="aside" sx={{ width: DRAWER_WIDTH, display: { xs: 'none', md: 'block' } }}>
      <Drawer
        variant={isPermament ? 'permanent' : 'temporary'}
        sx={{ '& .MuiDrawer-paper': { display: 'block', width: DRAWER_WIDTH } }}
        open={isPermament || isOpen}
        onClose={onClose}
      >
        <Toolbar />

        {asideNavigationItems.map((list, key) => (
          <Fragment key={key}>
            <Divider />
            <List>
              {list.map(({ title, icon: Icon, path }) => (
                <ListItem disablePadding key={title}>
                  <Link href={path}>
                    <Typography component="a" href={path} sx={{ width: '100%', color: '#fff', textDecoration: 'none' }}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText>{title}</ListItemText>
                      </ListItemButton>
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Fragment>
        ))}
      </Drawer>
    </Box>
  );
};
