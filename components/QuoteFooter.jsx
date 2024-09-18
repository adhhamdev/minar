import { motion } from 'framer-motion';

export default function QuoteFooter() {
  return (
    <motion.div
      className='w-full max-w-md mt-8'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}>
      <div className='text-center'>
        <p className='text-sm text-gray-600'>
          &quot;Indeed, prayer has been decreed upon the believers a decree of
          specified times.&quot; - Quran 4:103
        </p>
      </div>
    </motion.div>
  );
}
