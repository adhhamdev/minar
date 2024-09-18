import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { timeRegions } from './App';

export default function SettingsDialog({
  isOpen,
  setIsOpen,
  timeRegion,
  setTimeRegion,
  calculationMethod,
  setCalculationMethod,
  fetchPrayerTimes,
}) {
  const handleSaveSettings = () => {
    fetchPrayerTimes();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Select onValueChange={setTimeRegion} defaultValue={timeRegion}>
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
  );
}
