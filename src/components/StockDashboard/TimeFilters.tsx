
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface TimeFiltersProps {
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

const timeFilters = [
  { value: '1D', label: '1D' },
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '6M', label: '6M' },
  { value: '1Y', label: '1Y' },
  { value: '3Y', label: '3Y' },
  { value: '5Y', label: '5Y' },
  { value: 'ALL', label: 'ALL' },
];

export const TimeFilters: React.FC<TimeFiltersProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex justify-center w-full">
      <ToggleGroup
        type="single"
        value={selectedFilter}
        onValueChange={(value) => {
          if (value) onFilterChange(value);
        }}
        className="flex flex-wrap gap-1 sm:gap-2 justify-center"
      >
        {timeFilters.map((filter) => (
          <ToggleGroupItem
            key={filter.value}
            value={filter.value}
            className={cn(
              "text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors",
              selectedFilter === filter.value 
                ? "bg-primary border-primary text-white hover:bg-primary/90" 
                : "bg-white"
            )}
          >
            {filter.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
