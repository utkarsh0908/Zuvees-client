
"use client"

import './globals.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import Providers from '~/store/Providers';

const theme = createTheme();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Providers>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <main className="p-4 bg-gray-100 min-h-screen">{children}</main>
        </ThemeProvider>
      </Providers>
      </body>
    </html>
  );
}
