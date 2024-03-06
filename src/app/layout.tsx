import Providers from '../components/Providers';
import Navbar from '../components/Navbar';
import { Box } from '@mui/material';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Compassion Ministries',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Render HTML body with Providers and Navbar components, including children.
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Providers>
          <Navbar />
          <Box component="main" sx={{ p: 2 }}>
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
