import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Minar',
  description: 'Global Islamic Clock',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
