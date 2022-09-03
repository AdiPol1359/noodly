import { Alert, Box, CircularProgress } from '@mui/material';
import { PostSneakPeek } from 'components/base/PostSneakPeek';
import { LinkButton } from 'components/shared/LinkButton';
import { useUserPosts } from 'hooks/useUserPosts';

export const DashboardPostsPageContent = () => {
  const { data, isLoading, isError } = useUserPosts();

  if (isLoading || isError) {
    return <CircularProgress color="success" sx={{ display: 'block', margin: 'auto' }} />;
  }

  if (data.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Alert severity="info">Nie napisałeś jeszcze żadnego posta.</Alert>

        <LinkButton href="/dashboard/posts/add" variant="contained" color="info" sx={{ width: '100%', mt: 3 }}>
          Utwórz swojego pierwszego posta
        </LinkButton>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', gap: 3.5, flexWrap: 'wrap' }}>
      {data.map(({ id, ...rest }) => (
        <PostSneakPeek
          key={id}
          buttonTitle="Edytuj posta"
          buttonHref={`/dashboard/posts/edit/${id}`}
          hideIcons
          {...rest}
        />
      ))}
    </Box>
  );
};
