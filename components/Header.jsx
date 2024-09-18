import { Button } from '@/components/ui/button';
import { MoonStar, Settings } from 'lucide-react';

export default function Header({ isSettingsOpen, setIsSettingsOpen }) {
  return (
    <div className='flex items-center justify-between mb-6'>
      <h1 className='flex items-center text-2xl font-bold text-emerald-600'>
        <MoonStar className='w-4 h-4 mr-2' />
        Minar
      </h1>
      <Button
        variant='outline'
        size='icon'
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
        <Settings className='w-4 h-4' />
      </Button>
    </div>
  );
}
