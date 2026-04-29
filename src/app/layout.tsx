import 'tachyons/css/tachyons.min.css';
import '../index.css';
import Header from '../components/layout/Header/Header';

export const metadata = {
  title: 'Uprophet',
  description: 'A social network to express, share, and inspire with creative quotes.',
};

import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="App">
            <Header />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
