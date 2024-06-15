import AppLayout from '@/components/AppLayout';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Compassion Ministries',
};

export default function RootLayout({
  children,
  appbar,
}: {
  children: React.ReactNode;
  appbar?: React.ReactNode;
}) {
  //Render HTML body with Providers and Navbar components, including children.
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AppLayout appbar={appbar}>{children}</AppLayout>
      </body>
    </html>
  );
}
