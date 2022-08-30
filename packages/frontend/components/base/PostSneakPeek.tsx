import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { AuthAction } from './AuthAction';
import { LinkButton } from 'components/shared/LinkButton';

type PostProps = Readonly<{
  title: string;
  introduction: string;
  buttonTitle?: string;
  buttonHref?: string;
  hideIcons?: boolean;
}>;

export const PostSneakPeek = ({
  title,
  introduction,
  buttonTitle = 'Czytaj dalej',
  buttonHref = '#',
  hideIcons = false,
}: PostProps) => (
  <Card sx={{ width: { xs: '100%', sm: 500 } }}>
    <CardMedia component="img" height="140" image="/thumbnail.png" alt="sosna" />
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {introduction}
      </Typography>
    </CardContent>
    <CardActions>
      {!hideIcons && (
        <>
          <AuthAction>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </AuthAction>

          <AuthAction>
            <IconButton>
              <BookmarkIcon />
            </IconButton>
          </AuthAction>
        </>
      )}

      <LinkButton href={buttonHref}>{buttonTitle}</LinkButton>
    </CardActions>
  </Card>
);
