import { Alert, Avatar, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { PostSneakPeek } from 'components/base/PostSneakPeek';
import { useUser } from 'hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { createUserFollow, deleteUserFollow, getUserFollow } from 'services/user.service';
import { UserStatistics } from 'components/base/UserStatistics/UserStatistics';
import { useRouter } from 'next/router';
import { AuthAction } from 'components/base/AuthAction';

import type { User, Post } from '@noodly/common';

type Props = Readonly<{
  user: User;
  posts: Post[];
}>;

export const UserProfilePageContent = ({
  user: {
    id,
    username,
    details: { firstName, lastName },
    profile: { description },
  },
  posts,
}: Props) => {
  const router = useRouter();

  const { data: userData } = useUser();

  const isSelf = userData?.username === username;

  const { data, isLoading, refetch } = useQuery(
    ['user', userData?.id, 'follow', id],
    async () => {
      try {
        return userData ? await getUserFollow(userData.id, id) : null;
      } catch (err) {
        return null;
      }
    },
    { enabled: !!userData && !isSelf }
  );

  const isFollowing = !!data;

  const handleSelfButtonClick = () => {
    void router.push('/dashboard/account');
  };

  const handleButtonClick = async () => {
    if (userData) {
      isFollowing ? await deleteUserFollow(userData.id, id) : await createUserFollow(userData.id, id);

      await refetch();
    }
  };

  return (
    <Box sx={{ px: 1.5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 130, height: 130 }}>{firstName.charAt(0)}</Avatar>
        <Typography variant="h4" sx={{ mt: 1.5, color: grey[400] }}>
          {firstName} {lastName}
        </Typography>
        <Typography maxWidth="sm" sx={{ textAlign: 'center', mt: 0.5, color: grey[200] }}>
          {description}
        </Typography>

        <AuthAction>
          <Button
            variant="contained"
            color={isFollowing ? 'error' : 'success'}
            onClick={isSelf ? handleSelfButtonClick : handleButtonClick}
            disabled={!!userData && isLoading && !isSelf}
            sx={{ m: 2.5, px: 14, whiteSpace: 'nowrap', width: '100%', maxWidth: 'fit-content' }}
          >
            {isSelf ? 'Edytuj profil' : isFollowing ? 'Usuń obserwację' : 'Obserwuj'}
          </Button>
        </AuthAction>

        <UserStatistics userId={id} followData={data} />
      </Box>

      <Typography textAlign="center" variant="h5" sx={{ mt: 5 }}>
        Posty od użytkownika {username}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 3 }}>
        {posts.length === 0 ? (
          <Alert severity="info">Ten użytkownik nie zamieścił jeszcze żadnego posta.</Alert>
        ) : (
          posts.map(({ uuid, ...rest }) => (
            <PostSneakPeek key={uuid} buttonHref={`/user/${username}/post/${uuid}`} {...rest} />
          ))
        )}
      </Box>
    </Box>
  );
};
