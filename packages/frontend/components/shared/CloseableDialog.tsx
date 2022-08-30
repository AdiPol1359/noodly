import CloseIcon from '@mui/icons-material/Close';

import { Dialog, DialogTitle, IconButton } from '@mui/material';

import type { ReactNode } from 'react';

export type CloseableDialogProps = Readonly<{
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onExited?: () => void;
  children?: ReactNode;
}>;

export const CloseableDialog = ({ title, isOpen, onClose, onExited, children }: CloseableDialogProps) => (
  <Dialog
    open={isOpen}
    scroll="body"
    onClose={onClose}
    TransitionProps={{
      onExited,
    }}
  >
    <DialogTitle sx={{ m: 0, p: 2, minWidth: 350 }} textAlign="center">
      {title}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    {children}
  </Dialog>
);
