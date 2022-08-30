import NextLink from 'next/link';
import Image from 'next/image';
import dateFormat from 'dateformat';

import { Alert, Avatar, Container, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material';
import { Box } from '@mui/system';
import { colors } from '@mui/material';

import type { Post } from '@noodly/common';

import 'react-quill/dist/quill.snow.css';

const PostContent = styled('div')({
  'ol, ul': {
    padding: '0 17px 0 17px',
  },
  a: {
    color: colors.pink[300],
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
});

const DATE_MASK = 'dd.mm.yyyy HH:MM:ss';

type Props = Readonly<{
  post: Post;
}>;

export const UserPostPageContent = ({
  post: {
    title,
    introduction,
    content,
    creationDate,
    updateDate,
    author: { username, details },
  },
}: Props) => {
  if (!content) {
    return (
      <Alert color="error" sx={{ mt: 6 }}>
        Wystąpił problem z postem.
      </Alert>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography textAlign="center" sx={{ fontWeight: '500', fontSize: 40, color: colors.grey[400] }}>
        {title}
      </Typography>
      <Typography textAlign="center" sx={{ mt: 1, color: colors.grey[200] }}>
        {introduction}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar sx={{ width: 35, height: 35, mr: 1 }}>{details.firstName.charAt(0)}</Avatar>
          <NextLink href={`/user/${username}`}>
            <a style={{ color: '#fff', textDecoration: 'none' }}>
              {details.firstName} {details.lastName}
            </a>
          </NextLink>
        </Box>

        <Box sx={{ height: 450, borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
          <Image src="/thumbnail.png" alt="sosna" layout="fill" objectFit="cover" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
          <Typography sx={{ color: colors.grey[500] }}>
            Data utworzenia: {dateFormat(new Date(creationDate), DATE_MASK)}
          </Typography>

          <Typography sx={{ color: colors.grey[500], textAlign: 'right' }}>
            Data aktualizacji: {updateDate ? dateFormat(new Date(updateDate), DATE_MASK) : '-'}
          </Typography>
        </Box>
      </Box>

      <Divider variant="middle" sx={{ my: 4 }} />

      <div className="ql-snow">
        <PostContent
          dangerouslySetInnerHTML={{ __html: content }}
          className="ql-editor"
          style={{ padding: 0 }}
        ></PostContent>
      </div>
    </Container>
  );
};
