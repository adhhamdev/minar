import { motion } from 'framer-motion';

export default function NextPrayer({
  nextPrayer,
  countdown,
  prayerTimes,
  isLoading,
}) {
  return (
    <motion.div
      className='p-4 mb-6 rounded-lg bg-emerald-50'
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <h2 className='mb-2 text-xl font-semibold'>Next Prayer</h2>
      {isLoading ? (
        <div className='text-center'>Loading...</div>
      ) : (
        <div className='flex items-center justify-between'>
          <div>
            <div className='text-2xl font-bold text-emerald-600'>
              {nextPrayer || 'N/A'}
            </div>
            <div className='text-sm text-gray-600'>
              {prayerTimes && nextPrayer ? prayerTimes[nextPrayer] : 'N/A'}
            </div>
          </div>
          <div className='text-3xl font-bold'>{countdown || '00:00:00'}</div>
        </div>
      )}
    </motion.div>
  );
}
