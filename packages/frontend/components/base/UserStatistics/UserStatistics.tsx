import Paper from '@mui/material/Paper';

import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getUserStatistics } from 'services/user.service';
import { StatisticsDialog } from './StatisticsDialog';
import { useRouteChange } from 'hooks/useRouteChange';

import type { User } from '@noodly/common';
import type { ReactNode } from 'react';

type TableLinkCellProps = Readonly<{
  onClick: () => void;
  children: ReactNode;
}>;

const TableLinkCell = ({ onClick, children }: TableLinkCellProps) => (
  <TableCell>
    <Link underline="hover" sx={{ color: '#fff', cursor: 'pointer' }} onClick={onClick}>
      {children}
    </Link>
  </TableCell>
);

export type Dialog = 'followers' | 'followings';

type Props = Readonly<{
  userId: number;
  followData: User | null | undefined;
}>;

export const UserStatistics = ({ userId, followData }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openedDialog, setOpenedDialog] = useState<Dialog | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, refetch } = useQuery(['user', userId, 'statistics'], async () => {
    return await getUserStatistics(userId);
  });

  const handleCellClick = (dialog: Dialog) => () => {
    setIsOpen(true);
    setOpenedDialog(dialog);
  };

  useRouteChange(() => {
    setIsOpen(false);
    timeoutRef.current = setTimeout(() => setOpenedDialog(null), 300);
  });

  useEffect(() => {
    return () => {
      const { current } = timeoutRef;

      if (current) {
        clearTimeout(current);
      }
    };
  });

  useEffect(() => {
    void refetch();
  }, [followData, refetch]);

  return (
    <>
      <TableContainer component={Paper} sx={{ width: 'fit-content' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Posty</TableCell>
              <TableLinkCell onClick={handleCellClick('followers')}>Liczba obserwujących</TableLinkCell>
              <TableLinkCell onClick={handleCellClick('followings')}>Obserwuje</TableLinkCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data?.posts}</TableCell>
              <TableCell>{data?.followers}</TableCell>
              <TableCell>{data?.following}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {openedDialog && (
        <StatisticsDialog
          userId={userId}
          dialog={openedDialog}
          onClose={() => setIsOpen(false)}
          onExited={() => setOpenedDialog(null)}
          isOpen={isOpen}
        />
      )}
    </>
  );
};
