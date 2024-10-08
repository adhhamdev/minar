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
  { value: 'Asia/Kolkata', label: 'Mumbai' },
  { value: 'Asia/Shanghai', label: 'Shanghai' },
  { value: 'Asia/Singapore', label: 'Singapore' },
  { value: 'Asia/Colombo', label: 'Colombo' },
];

export default function App({ city }) {
  const [currentTime, setCurrentTime] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [timeRegion, setTimeRegion] = useState(timeRegions[0].value);
  const [calculationMethod, setCalculationMethod] = useState('2');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const { coords } = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const { latitude, longitude } = coords;
        const date = new Date();
        const response = await fetch(
          `${API_BASE_URL}/timings/${
            date.toISOString().split('T')[0]
          }?latitude=${latitude}&longitude=${longitude}&method=${calculationMethod}`
        );
        const data = await response.json();
        setTimeRegion(data.data.meta.timezone);
      } catch (error) {
        console.error('Error fetching timings:', error);
      }
    };
    fetchTimings();
  }, []);
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
      const date = new Date().toISOString().split('T')[0];
      const cityLabel =
        timeRegions.find((r) => r.value === timeRegion)?.label || '';
      const response = await fetch(
        `${API_BASE_URL}/timingsByCity/${date}?city=${cityLabel}&country=&method=${calculationMethod}`
      );
      const { data } = await response.json();
      setPrayerTimes(data.timings);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNextPrayer = () => {
    if (!prayerTimes || !currentTime) return;

    const now = currentTime;
    let nextPrayerName = null;
    let minDiff = Infinity;

    prayerNames.forEach((prayer) => {
      const prayerTime = new Date(
        `${now.toDateString()} ${prayerTimes[prayer]}`
      );
      if (prayerTime > now) {
        const diff = prayerTime - now;
        if (diff < minDiff) {
          minDiff = diff;
          nextPrayerName = prayer;
        }
      }
    });

    if (!nextPrayerName) {
      nextPrayerName = prayerNames[0];
      const tomorrowDate = new Date(now);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      minDiff =
        new Date(
          `${tomorrowDate.toDateString()} ${prayerTimes[nextPrayerName]}`
        ) - now;
    }

    setNextPrayer(nextPrayerName);

    const hours = String(Math.floor(minDiff / (1000 * 60 * 60))).padStart(
      2,
      '0'
    );
    const minutes = String(
      Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, '0');
    const seconds = String(Math.floor((minDiff % (1000 * 60)) / 1000)).padStart(
      2,
      '0'
    );
    setCountdown(`${hours}:${minutes}:${seconds}`);
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
