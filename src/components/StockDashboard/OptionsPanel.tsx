
import React from 'react';
import { cn } from '@/lib/utils';

interface Option {
  name: string;
  type: 'Call' | 'Put';
  strike: number;
  price: number;
  change: number;
}

interface OptionsPanelProps {
  options: Option[];
}

const mockOptions: Option[] = [
  { name: 'SENSEX 79700', type: 'Call', strike: 79700, price: 50.40, change: -67.55 },
  { name: 'SENSEX 79500', type: 'Put', strike: 79500, price: 26.75, change: -91.79 },
  { name: 'SENSEX 79800', type: 'Call', strike: 79800, price: 33.25, change: -74.22 },
  { name: 'SENSEX 79500', type: 'Call', strike: 79500, price: 97.20, change: -48.84 },
  { name: 'SENSEX 79500', type: 'Put', strike: 79500, price: 41.65, change: -95.27 },
];

export const OptionsPanel: React.FC<OptionsPanelProps> = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Top BSE Sensex Options</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {mockOptions.map((option, index) => (
          <div key={index} className="p-4 flex justify-between items-center hover:bg-gray-50">
            <div>
              <div className="text-sm font-medium text-gray-900">{option.name} {option.type}</div>
              <div className="text-sm text-gray-500">Strike: ₹{option.strike}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">₹{option.price}</div>
              <div
                className={cn(
                  "text-sm",
                  option.change >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {option.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
