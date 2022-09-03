import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';

import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material';

type NavigationItem = {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  path: string;
  loggedIn?: boolean;
};

export const asideNavigationItems: NavigationItem[][] = [
  [{ title: 'Pulpit', icon: DashboardIcon, path: '/dashboard' }],
  [
    { title: 'Twoje posty', icon: ReceiptIcon, path: '/dashboard/posts' },
    { title: 'Dodaj posta', icon: AddIcon, path: '/dashboard/posts/add' },
  ],
  [
    { title: 'Ustawienia konta', icon: ManageAccountsIcon, path: '/dashboard/account' },
    { title: 'Powrót', icon: LogoutIcon, path: '/' },
  ],
];

export const bottomNavigationItems: NavigationItem[] = [
  { title: 'Strona główna', icon: HomeIcon, path: '/' },
  { title: 'Logowanie', icon: AccountCircleIcon, path: '/sign-in', loggedIn: false },
  { title: 'Regualmin', icon: ArticleIcon, path: '/rules' },
];
