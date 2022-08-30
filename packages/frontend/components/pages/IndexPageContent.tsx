import { Box, Typography } from '@mui/material';
import { LOGIN_PAGE_PATH } from 'contants';
import { useUser } from 'hooks/useUser';
import { LinkButton } from 'components/shared/LinkButton';

export const IndexPageContent = () => {
  const { data } = useUser();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2" fontWeight="500">
        Noodly
      </Typography>
      <Typography sx={{ mb: 3.5, fontSize: { xs: '6vw', sm: 34 } }}>Największa platforma blogowa</Typography>

      <LinkButton
        href={data ? `/user/${data.username}` : LOGIN_PAGE_PATH}
        variant="contained"
        color={data ? 'success' : 'primary'}
      >
        {data ? 'Przejdź do profilu' : 'Dołącz już teraz!'}
      </LinkButton>
    </Box>
  );
};
