import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const viewport = {
  themeColor: '#F0FDF4',
  colorScheme: '#F0FDF4'
}

export const metadata = {
  title: 'Minar',
  description: 'Global Islamic Clock',
  generator: 'Next.js',
  applicationName: 'Minar',
  referrer: 'origin-when-cross-origin',
  keywords: ['Minar', 'Islam', 'Muslim', 'Islam App', 'Muslim App', 'Azan', 'Prayer Times', 'Minar Clock'],
  authors: [{ name: 'Adhham Safwan', url: 'https://adhham.vercel.app' }],
  creator: 'Adhham Safwan',
  publisher: 'Adhham Safwan',
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
