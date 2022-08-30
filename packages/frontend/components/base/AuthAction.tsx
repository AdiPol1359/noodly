import { cloneElement, useState } from 'react';
import { useUser } from 'hooks/useUser';
import { CloseableDialog } from 'components/shared/CloseableDialog';
import { DialogActions, DialogContent } from '@mui/material';
import { LOGIN_PAGE_PATH } from 'contants';
import { LinkButton } from 'components/shared/LinkButton';

import type { ReactElement } from 'react';

export const AuthAction = ({ children }: { children: ReactElement }) => {
  const { data } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  return data ? (
    children
  ) : (
    <>
      {cloneElement(children, { onClick: () => setIsOpen(true) })}

      <CloseableDialog title="Zaloguj się" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent dividers>Ta czynność jest dostępna tylko dla zalogowanych użytkowników!</DialogContent>
        <DialogActions>
          <LinkButton href={LOGIN_PAGE_PATH}>Zaloguj się</LinkButton>
        </DialogActions>
      </CloseableDialog>
    </>
  );
};
