import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { timeRegions } from './Main';

export default function CurrentTime({ currentTime, timeRegion }) {
  return (
    <>
      <motion.div
        className='mb-4 text-center'
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <div className='flex items-center justify-center text-sm text-gray-600'>
          <MapPin className='w-4 h-4 mr-1' />
          {timeRegions.find((r) => r.value === timeRegion)?.label}
        </div>
      </motion.div>
      <motion.div
        className='mb-6 text-center'
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {currentTime ? (
          <>
            <div className='mb-2 text-4xl font-bold'>
              {currentTime.toLocaleTimeString()}
            </div>
            <div className='text-gray-600'>{currentTime.toDateString()}</div>
          </>
        ) : (
          <div className='mb-2 text-2xl font-bold'>Loading...</div>
        )}
      </motion.div>
    </>
  );
}
