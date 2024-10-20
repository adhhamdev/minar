import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const viewport = {
  themeColor: '#F0FDF4',
  colorScheme: '#F0FDF4',
};

export const metadata = {
  title: 'Minar',
  description: 'Global Islamic Clock',
  generator: 'Next.js',
  applicationName: 'Minar',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Minar',
    'Islam',
    'Muslim',
    'Islam App',
    'Muslim App',
    'Azan',
    'Prayer Times',
    'Minar Clock',
  ],
  authors: [{ name: 'Adhham Safwan', url: 'https://adhham.vercel.app' }],
  creator: 'Adhham Safwan',
  publisher: 'Adhham Safwan',
  formatDetection: {
    email: false,
    telephone: false,
  },
  other: {
    "google-site-verification": "0R28Xy-oyNhcE2_MB10Jrkoayy5JcPf7mkx89IIMySk"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <Script src='service-worker.js' strategy='beforeInteractive' />
      </head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
