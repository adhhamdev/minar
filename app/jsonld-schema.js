export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Minar - Islamic Prayer Times',
  applicationCategory: 'ReligiousApplication',
  operatingSystem: 'Any',
  description:
    'Global Islamic Clock providing accurate prayer times, qibla direction, and Islamic features worldwide',
  url: 'https://minarapp.vercel.app',
  author: {
    '@type': 'Person',
    name: 'Adhham Safwan',
    url: 'https://adhham.vercel.app',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Minar',
    logo: {
      '@type': 'ImageObject',
      url: 'https://minarapp.vercel.app/icon.png',
    },
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  screenshot: [
    {
      '@type': 'ImageObject',
      url: 'https://minarapp.vercel.app/minar.png',
      caption: 'Minar App Mobile View',
    },
    {
      '@type': 'ImageObject',
      url: 'https://minarapp.vercel.app/minar-wide.png',
      caption: 'Minar App Desktop View',
    },
  ],
  featureList: [
    'Islamic Prayer Times',
    'Multiple Calculation Methods',
    'Global Location Support',
    'Real-time Prayer Countdown',
    'Next Prayer Notifications',
    'Qibla Direction',
  ],
  applicationSuite: 'Islamic Tools',
  availableOnDevice: ['Desktop', 'Mobile', 'Tablet'],
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  softwareVersion: '0.1.0',
};
