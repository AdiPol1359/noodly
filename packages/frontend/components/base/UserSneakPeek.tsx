import Link from 'next/link';

import { Avatar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';

type Props = Readonly<{
  firstName: string;
  lastName: string | null;
  username: string;
}>;

export const UserSneakPeek = ({ firstName, lastName, username }: Props) => (
  <Link href={`/user/${username}`}>
    <a style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          bgcolor: grey[800],
          borderRadius: 1,
          px: 1,
          pr: 1.5,
          py: 0.8,
          mb: 0.7,
        }}
      >
        <Avatar sx={{ mr: 1 }}>{firstName.charAt(0)}</Avatar>

        <Box sx={{ display: 'flex', flexDirection: 'column', color: grey[300] }}>
          <Typography component="span" sx={{ lineHeight: 1, fontWeight: 500 }}>
            {firstName} {lastName}
          </Typography>
          <Typography component="span" sx={{ lineHeight: 1, fontSize: 12, mt: 0.2 }}>
            {username}
          </Typography>
        </Box>
      </Box>
    </a>
  </Link>
);
