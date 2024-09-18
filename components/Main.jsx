'use client';

import CurrentTime from '@/components/CurrentTime';
import Header from '@/components/Header';
import NextPrayer from '@/components/NextPrayer';
import PrayerTable from '@/components/PrayerTable';
import QuoteFooter from '@/components/QuoteFooter';
import SettingsDialog from '@/components/SettingsDialog';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'https://api.aladhan.com/v1';

export const prayerNames = [
  'Fajr',
  'Sunrise',
  'Dhuhr',
  'Asr',
  'Maghrib',
  'Isha',
];

export const timeRegions = [
  { value: 'Europe/London', label: 'London' },
  { value: 'America/New_York', label: 'New York' },
  { value: 'Asia/Dubai', label: 'Dubai' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'Australia/Sydney', label: 'Sydney' },
  { value: 'America/Los_Angeles', label: 'Los Angeles' },
  { value: 'America/Toronto', label: 'Toronto' },
  { value: 'America/Chicago', label: 'Chicago' },
  { value: 'America/Mexico_City', label: 'Mexico City' },
  { value: 'America/Sao_Paulo', label: 'Sao Paulo' },
  { value: 'Asia/Kolkata', label: 'Mumbai' },
  { value: 'Asia/Shanghai', label: 'Shanghai' },
  { value: 'Asia/Singapore', label: 'Singapore' },
  { value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur' },
  { value: 'Asia/Jakarta', label: 'Jakarta' },
  { value: 'Asia/Manila', label: 'Manila' },
  { value: 'Asia/Seoul', label: 'Seoul' },
  { value: 'Asia/Taipei', label: 'Taipei' },
  { value: 'Asia/Bangkok', label: 'Bangkok' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong' },
  { value: 'Asia/Riyadh', label: 'Riyadh' },
  { value: 'Asia/Kuwait', label: 'Kuwait' },
  { value: 'Asia/Doha', label: 'Doha' },
  { value: 'Asia/Beirut', label: 'Beirut' },
  { value: 'Africa/Cairo', label: 'Cairo' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg' },
  { value: 'Europe/Paris', label: 'Paris' },
  { value: 'Europe/Berlin', label: 'Berlin' },
  { value: 'Europe/Madrid', label: 'Madrid' },
  { value: 'Europe/Rome', label: 'Rome' },
  { value: 'Europe/Istanbul', label: 'Istanbul' },
  { value: 'Europe/Moscow', label: 'Moscow' },
  { value: 'Europe/Amsterdam', label: 'Amsterdam' },
  { value: 'Europe/Stockholm', label: 'Stockholm' },
];

export default function Main() {
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

  return (
    <div className='min-h-screen bg-green-50'>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjBmMGYwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U2ZTZlNiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U2ZTZlNiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-10"></div>
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen p-4'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md p-6 bg-white rounded-lg shadow-xl bg-opacity-80 backdrop-blur-md'>
          <Header
            isSettingsOpen={isSettingsOpen}
            setIsSettingsOpen={setIsSettingsOpen}
          />
          <CurrentTime currentTime={currentTime} timeRegion={timeRegion} />
          <NextPrayer
            nextPrayer={nextPrayer}
            countdown={countdown}
            prayerTimes={prayerTimes}
            isLoading={isLoading}
          />
          <PrayerTable prayerTimes={prayerTimes} isLoading={isLoading} />
        </motion.div>
        <QuoteFooter />
      </div>
      <SettingsDialog
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
        timeRegion={timeRegion}
        setTimeRegion={setTimeRegion}
        calculationMethod={calculationMethod}
        setCalculationMethod={setCalculationMethod}
        fetchPrayerTimes={fetchPrayerTimes}
      />
    </div>
  );
}
