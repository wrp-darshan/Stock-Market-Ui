
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { TimeFilters } from './TimeFilters';

interface StockChartProps {
  data: {
    timestamp: string;
    price: number;
  }[];
}

// Generate different mock data for each time filter
const generateMockData = (points: number, basePrice: number, volatility: number) => {
  return Array.from({ length: points }, (_, i) => ({
    timestamp: `${i + 1}:00`,
    price: basePrice + (Math.random() - 0.5) * volatility,
  }));
};

const mockDataByFilter = {
  '1D': generateMockData(24, 79000, 1000),
  '1W': generateMockData(7, 78500, 2000),
  '1M': generateMockData(30, 77000, 3000),
  '3M': generateMockData(12, 76000, 4000),
  '6M': generateMockData(12, 75000, 5000),
  '1Y': generateMockData(12, 70000, 7000),
  '3Y': generateMockData(12, 60000, 10000),
  '5Y': generateMockData(12, 50000, 15000),
  'ALL': generateMockData(12, 40000, 20000),
};

export const StockChart: React.FC<StockChartProps> = () => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('1D');
  const [chartData, setChartData] = useState(mockDataByFilter['1D']);

  // Update chart data when time filter changes
  useEffect(() => {
    setChartData(mockDataByFilter[selectedTimeFilter as keyof typeof mockDataByFilter]);
  }, [selectedTimeFilter]);

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="w-full h-auto overflow-hidden mb-6">
        <ChartContainer
          config={{
            line: { theme: { light: '#9b87f5', dark: '#8B5CF6' } },
            background: { theme: { light: '#ffffff', dark: '#1F2937' } },
          }}
        >
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="timestamp" />
            <YAxis domain={['auto', 'auto']} />
            <ChartTooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--color-line)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
      <div className="mt-2">
        <TimeFilters 
          selectedFilter={selectedTimeFilter}  
          onFilterChange={setSelectedTimeFilter}
        />
      </div>
    </div>
  );
};
