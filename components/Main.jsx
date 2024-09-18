'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import {
  CloudMoon,
  CloudSun,
  MapPin,
  Settings,
  Sun,
  Sunrise,
  Sunset,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'https://api.aladhan.com/v1';

const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const prayerIcons = {
  Fajr: <Sunrise className='w-6 h-6' />,
  Sunrise: <Sun className='w-6 h-6' />,
  Dhuhr: <Sun className='w-6 h-6' />,
  Asr: <CloudSun className='w-6 h-6' />,
  Maghrib: <Sunset className='w-6 h-6' />,
  Isha: <CloudMoon className='w-6 h-6' />,
};

const timeRegions = [
  { value: 'Europe/London', label: 'London' },
  { value: 'America/New_York', label: 'New York' },
  { value: 'Asia/Dubai', label: 'Dubai' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'Australia/Sydney', label: 'Sydney' },
];

export default function Component() {
  const [currentTime, setCurrentTime] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [timeRegion, setTimeRegion] = useState(timeRegions[0].value);
  const [calculationMethod, setCalculationMethod] = useState('2');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      const now = new Date();
      const options = { timeZone: timeRegion };
      const localTime = now.toLocaleString('en-US', options);
      setCurrentTime(new Date(localTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeRegion]);

  useEffect(() => {
    fetchPrayerTimes();
  }, [timeRegion, calculationMethod]);

  useEffect(() => {
    if (prayerTimes && currentTime) {
      updateNextPrayer();
    }
  }, [currentTime, prayerTimes]);

  const fetchPrayerTimes = async () => {
    setIsLoading(true);
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const response = await fetch(
        `${API_BASE_URL}/timingsByCity/${year}-${month}-${day}?city=${
          timeRegions.find((r) => r.value === timeRegion)?.label
        }&country=&method=${calculationMethod}`
      );
      const data = await response.json();
      setPrayerTimes(data.data.timings);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    }
    setIsLoading(false);
  };

  const updateNextPrayer = () => {
    if (!prayerTimes || !currentTime) return;

    const now = currentTime;
    let nextPrayerName = null;
    let minDiff = Infinity;

    for (const prayer of prayerNames) {
      const prayerTime = new Date(
        now.toDateString() + ' ' + prayerTimes[prayer]
      );
      if (prayerTime > now) {
        const diff = prayerTime.getTime() - now.getTime();
        if (diff < minDiff) {
          minDiff = diff;
          nextPrayerName = prayer;
        }
      }
    }

    if (!nextPrayerName) {
      nextPrayerName = prayerNames[0];
      const tomorrowDate = new Date(now);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      minDiff =
        new Date(
          tomorrowDate.toDateString() + ' ' + prayerTimes[nextPrayerName]
        ).getTime() - now.getTime();
    }

    setNextPrayer(nextPrayerName);

    const hours = Math.floor(minDiff / (1000 * 60 * 60));
    const minutes = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((minDiff % (1000 * 60)) / 1000);
    setCountdown(
      `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    );
  };

  const handleSaveSettings = () => {
    fetchPrayerTimes();
    setIsSettingsOpen(false);
  };

  return (
    <div className='min-h-screen bg-[#f0e6d2]'>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjBmMGYwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U2ZTZlNiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U2ZTZlNiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-10"></div>
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen p-4'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md p-6 bg-white rounded-lg shadow-xl bg-opacity-80 backdrop-blur-md'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-emerald-600'>
              Islamic Time App
            </h1>
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Settings className='w-4 h-4' />
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
                  <DialogDescription>
                    Adjust your time region and calculation method preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid items-center grid-cols-4 gap-4'>
                    <Label htmlFor='timeRegion' className='text-right'>
                      Time Region
                    </Label>
                    <Select
                      onValueChange={setTimeRegion}
                      defaultValue={timeRegion}>
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select time region' />
                      </SelectTrigger>
                      <SelectContent>
                        {timeRegions.map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid items-center grid-cols-4 gap-4'>
                    <Label htmlFor='method' className='text-right'>
                      Method
                    </Label>
                    <Select
                      onValueChange={setCalculationMethod}
                      defaultValue={calculationMethod}>
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select calculation method' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='1'>
                          Egyptian General Authority of Survey
                        </SelectItem>
                        <SelectItem value='2'>
                          Islamic Society of North America
                        </SelectItem>
                        <SelectItem value='3'>Muslim World League</SelectItem>
                        <SelectItem value='4'>
                          Umm Al-Qura University, Makkah
                        </SelectItem>
                        <SelectItem value='5'>
                          Egyptian General Authority of Survey
                        </SelectItem>
                        <SelectItem value='7'>
                          Institute of Geophysics, University of Tehran
                        </SelectItem>
                        <SelectItem value='8'>Gulf Region</SelectItem>
                        <SelectItem value='9'>Kuwait</SelectItem>
                        <SelectItem value='10'>Qatar</SelectItem>
                        <SelectItem value='11'>
                          Majlis Ugama Islam Singapura, Singapore
                        </SelectItem>
                        <SelectItem value='12'>
                          Union Organization islamic de France
                        </SelectItem>
                        <SelectItem value='13'>
                          Diyanet İşleri Başkanlığı, Turkey
                        </SelectItem>
                        <SelectItem value='14'>
                          Spiritual Administration of Muslims of Russia
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type='submit' onClick={handleSaveSettings}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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
                <div className='text-gray-600'>
                  {currentTime.toDateString()}
                </div>
              </>
            ) : (
              <div className='mb-2 text-2xl font-bold'>Loading...</div>
            )}
          </motion.div>
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
                    {prayerTimes && nextPrayer
                      ? prayerTimes[nextPrayer]
                      : 'N/A'}
                  </div>
                </div>
                <div className='text-3xl font-bold'>
                  {countdown || '00:00:00'}
                </div>
              </div>
            )}
          </motion.div>
          <motion.div
            className='overflow-x-auto'
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
        </motion.div>
        <motion.div
          className='w-full max-w-md mt-8'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}>
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              &quot;Indeed, prayer has been decreed upon the believers a decree
              of specified times.&quot; - Quran 4:103
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
