import { motion } from 'framer-motion';
import { CloudMoon, CloudSun, Sun, Sunrise, Sunset } from 'lucide-react';
import { prayerNames } from './App';

const prayerIcons = {
  Fajr: <Sunrise className='w-6 h-6' />,
  Sunrise: <Sun className='w-6 h-6' />,
  Dhuhr: <Sun className='w-6 h-6' />,
  Asr: <CloudSun className='w-6 h-6' />,
  Maghrib: <Sunset className='w-6 h-6' />,
  Isha: <CloudMoon className='w-6 h-6' />,
};

export default function PrayerTable({ prayerTimes, isLoading }) {
  return (
    <motion.div
      className='overflow-x-auto rounded-lg'
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}>
      <table className='w-full'>
        <thead>
          <tr className='bg-emerald-100'>
            <th className='px-4 py-2 text-left'>Prayer</th>
            <th className='px-4 py-2 text-left'>Time</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={2} className='py-4 text-center'>
                Loading prayer times...
              </td>
            </tr>
          ) : (
            prayerNames.map((prayer) => (
              <motion.tr
                key={prayer}
                className='border-b'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: prayerNames.indexOf(prayer) * 0.1,
                }}>
                <td className='flex items-center px-4 py-2'>
                  {prayerIcons[prayer]}
                  <span className='ml-2'>{prayer}</span>
                </td>
                <td className='px-4 py-2'>
                  {prayerTimes ? prayerTimes[prayer] : 'N/A'}
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
}
