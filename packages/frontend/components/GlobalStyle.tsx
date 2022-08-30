import { GlobalStyles } from '@mui/material';

export const GlobalStyle = () => (
  <GlobalStyles
    styles={{
      '*, *::before, *::after': { padding: 0, margin: 0, boxSizing: 'border-box' },
      html: { fontFamily: "font-family: 'Roboto', sans-serif" },
      'html, body, #__next': { minHeight: '100%' },
    }}
  />
);
