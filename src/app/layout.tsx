import AppLayout from '@/components/AppLayout';

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
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
