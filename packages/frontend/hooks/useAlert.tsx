import { useCallback, useState } from 'react';
import { Alert } from '@mui/material';

import type { AlertColor, SxProps } from '@mui/material';
import type { Theme } from '@mui/system';

type AlertData = Readonly<{
  severity: AlertColor;
  message: string;
}>;

export const useAlert = (styles?: SxProps<Theme>) => {
  const [data, setData] = useState<AlertData | null>(null);

  const showAlert = useCallback((data: AlertData) => setData(data), []);

  const alert = data && (
    <Alert severity={data.severity} onClose={() => setData(null)} sx={styles}>
      {data.message}
    </Alert>
  );

  return [alert, showAlert] as const;
};
