import 'tachyons/css/tachyons.min.css';
import '../index.css';
import Header from '../components/layout/Header/Header';

export const metadata = {
  title: 'uProphet',
  description: 'uProphet Web App',
};

import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
