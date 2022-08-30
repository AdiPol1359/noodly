import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { UserSneakPeek } from 'components/base/UserSneakPeek';
import { getUsers } from 'services/user.service';
import { useDebounce } from 'hooks/useDebounce';
import { useRouteChange } from 'hooks/useRouteChange';

import type { User } from '@noodly/common';

export const SearchInput = () => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    (async () => {
      const value = debouncedValue ? await getUsers({ search: debouncedValue }) : [];

      setUsers(value);
    })();
  }, [debouncedValue]);

  useRouteChange(() => {
    setValue('');
    setUsers([]);
  });

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        px: 1.5,
        py: 0.5,
        backgroundColor: 'divider',
        borderRadius: 1,
        flexGrow: 1,
      }}
    >
      <SearchIcon sx={{ mr: 0.5 }} />
      <InputBase
        placeholder="Wyszukaj użytkownika"
        sx={{ flexGrow: 1 }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        spellCheck={false}
        autoComplete="off"
      />

      <Box sx={{ position: 'absolute', left: 0, top: 45, width: '100%', zIndex: 99 }}>
        {users.map(({ username, details: { firstName, lastName } }) => (
          <UserSneakPeek key={username} username={username} firstName={firstName} lastName={lastName} />
        ))}
      </Box>
    </Box>
  );
};
