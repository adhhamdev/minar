import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { personSchema, websiteSchema } from './jsonld-schema';

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
  title: 'Minar - Islamic Prayer Times',
  description: 'Global Islamic Clock',
  generator: 'Next.js',
  applicationName: 'Minar',
  referrer: 'origin-when-cross-origin',
  keywords:
    'Minar, Islamic Prayer Times, Muslim Prayer App, Salah Times, Adhan Reminder, Qibla Direction, Ramadan Calendar, Islamic Holidays, Mosque Finder, Quran Reading, Dua Collection, Halal Restaurant Locator, Islamic Lifestyle, Muslim Community, Islamic Education',
  authors: [{ name: 'Adhham Safwan', url: 'https://adhham.vercel.app' }],
  creator: 'Adhham Safwan',
  publisher: 'Adhham Safwan',
  other: {
    'google-site-verification': '0R28Xy-oyNhcE2_MB10Jrkoayy5JcPf7mkx89IIMySk',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <Script src='service-worker.js' strategy='beforeInteractive' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, personSchema]),
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
