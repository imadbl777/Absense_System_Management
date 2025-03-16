import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const Ext = () => {
  const [slotTime, setSlotTime] = useState(510); 
  const [eventStart, setEventStart] = useState(510);
  const [duration, setDuration] = useState(2);

  const formatMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const isWithinEventTime = 
    slotTime >= eventStart && 
    slotTime < eventStart + duration * 60;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Schedule Time Slot Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
       
        <div className="relative h-20 bg-gray-100 rounded-lg">
       
          <div 
            className="absolute top-0 h-full bg-blue-400 opacity-30"
            style={{
              left: `${(eventStart - 480) / (840 - 480) * 100}%`,
              width: `${(duration * 60) / (840 - 480) * 100}%`
            }}
          >
            <div className="text-xs text-blue-800 p-1">
              Event Duration: {duration}h
            </div>
          </div>
                    <div 
            className="absolute top-0 w-2 h-full bg-red-500"
            style={{
              left: `${(slotTime - 480) / (40 - 480) * 100}%`
            }}
          >
            <div className="text-xs text-red-800 whitespace-nowrap mt-20">
              Current Slot: {formatMinutesToTime(slotTime)}
            </div>
          </div>
          

          <div className="absolute bottom-0 w-full flex justify-between px-2 text-xs text-gray-600">
            <span>8:00</span>
            <span>10:00</span>
            <span>12:00</span>
            <span>14:00</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Time Slot: {formatMinutesToTime(slotTime)}
            </label>
            <Slider 
              value={[slotTime]}
              min={480}
              max={840}
              step={30}
              onValueChange={(value) => setSlotTime(value[0])}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Start Time: {formatMinutesToTime(eventStart)}
            </label>
            <Slider 
              value={[eventStart]}
              min={480}
              max={840}
              step={30}
              onValueChange={(value) => setEventStart(value[0])}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Duration: {duration} hours
            </label>
            <Slider 
              value={[duration]}
              min={1}
              max={4}
              step={0.5}
              onValueChange={(value) => setDuration(value[0])}
            />
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isWithinEventTime ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="font-medium">
            Is time slot within event?{' '}
            <span className={isWithinEventTime ? 'text-green-600' : 'text-red-600'}>
              {isWithinEventTime ? 'Yes' : 'No'}
            </span>
          </p>
          <p className="text-sm mt-2">
            {isWithinEventTime 
              ? `The time slot ${formatMinutesToTime(slotTime)} falls within the event that starts at ${formatMinutesToTime(eventStart)} and lasts ${duration} hours.`
              : `The time slot ${formatMinutesToTime(slotTime)} is outside the event period (${formatMinutesToTime(eventStart)} - ${formatMinutesToTime(eventStart + duration * 60)}).`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Ext;