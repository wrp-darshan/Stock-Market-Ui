
import React from 'react';
import { ArrowUp, ArrowDown, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Stock = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: number;
};

type SortField = 'price' | 'change' | 'volume';

interface StockTableProps {
  stocks: Stock[];
  sortField: SortField | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: SortField) => void;
}

export const StockTable: React.FC<StockTableProps> = ({
  stocks,
  sortField,
  sortDirection,
  onSort,
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `${(volume / 1e9).toFixed(2)}B`;
    }
    if (volume >= 1e6) {
      return `${(volume / 1e6).toFixed(2)}M`;
    }
    return volume.toLocaleString();
  };

  const SortHeader: React.FC<{ field: SortField; label: string }> = ({ field, label }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex flex-col">
          {sortField === field && (
            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
          )}
        </div>
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <SortHeader field="price" label="Price" />
            <SortHeader field="change" label="Change" />
            <SortHeader field="volume" label="Volume" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map((stock) => (
            <tr
              key={stock.id}
              className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                  <div className="text-sm text-gray-500">{stock.symbol}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${formatNumber(stock.price)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm",
                    stock.change >= 0
                      ? "text-green-800 bg-green-100"
                      : "text-red-800 bg-red-100"
                  )}
                >
                  {stock.change >= 0 ? (
                    <ArrowUp size={16} className="mr-1" />
                  ) : (
                    <ArrowDown size={16} className="mr-1" />
                  )}
                  {Math.abs(stock.change)}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatVolume(stock.volume)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
