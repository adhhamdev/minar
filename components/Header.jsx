import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export default function Header({ isSettingsOpen, setIsSettingsOpen }) {
  return (
    <div className='flex items-center justify-between mb-6'>
      <h1 className='text-2xl font-bold text-emerald-600'>Islamic Time App</h1>
      <Button
        variant='outline'
        size='icon'
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
        <Settings className='w-4 h-4' />
      </Button>
    </div>
  );
}
