import dynamic from 'next/dynamic';

import { Box } from '@mui/system';

import type { ReactQuillProps } from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const PostEditor = (props: ReactQuillProps) => (
  <Box sx={{ mb: 2, zIndex: 99 }}>
    <ReactQuill
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
          ['bold', 'italic', 'underline', 'strike', { align: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, 'blockquote', 'code-block'],
          ['image', 'link'],
          ['clean'],
        ],
      }}
      {...props}
    />
  </Box>
);
