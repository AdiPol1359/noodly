import { useRef } from 'react';
import { DialogContent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { CloseableDialog } from 'components/shared/CloseableDialog';
import { getUserFollowers, getUserFollowings } from 'services/user.service';
import { UserSneakPeek } from '../UserSneakPeek';

import type { Dialog } from './UserStatistics';
import type { CloseableDialogProps } from 'components/shared/CloseableDialog';

type Props = Readonly<{
  userId: number;
  dialog: Dialog | null;
}> &
  Omit<CloseableDialogProps, 'title'>;

export const StatisticsDialog = ({ userId, dialog, isOpen, onClose, onExited }: Props) => {
  const { current: id } = useRef(userId);

  const { data } = useQuery(
    ['user', id, dialog],
    async () => {
      return dialog === 'followers' ? await getUserFollowers(id) : await getUserFollowings(id);
    },
    {
      initialData: [],
    }
  );

  return (
    <CloseableDialog
      title={`Lista ${dialog === 'followers' ? 'obserwujących' : 'obserwowanych'}`}
      isOpen={isOpen}
      onClose={onClose}
      onExited={onExited}
    >
      <DialogContent>
        {data.map(({ username, details: { firstName, lastName } }) => (
          <UserSneakPeek key={username} username={username} firstName={firstName} lastName={lastName} />
        ))}
      </DialogContent>
    </CloseableDialog>
  );
};
