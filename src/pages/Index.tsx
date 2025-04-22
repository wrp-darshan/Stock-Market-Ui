
import React, { useState, useMemo } from 'react';
import { StockTable } from '@/components/StockDashboard/StockTable';
import { SearchBar } from '@/components/StockDashboard/SearchBar';
import { StockChart } from '@/components/StockDashboard/StockChart';
import { OptionsPanel } from '@/components/StockDashboard/OptionsPanel';
import { mockStocks } from '@/data/mockStocks';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'price' | 'change' | 'volume' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedStocks = useMemo(() => {
    let result = mockStocks;

    // Filter based on search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (stock) =>
          stock.name.toLowerCase().includes(lowerSearchTerm) ||
          stock.symbol.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Sort if sort field is selected
    if (sortField) {
      result = [...result].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        return (a[sortField] - b[sortField]) * multiplier;
      });
    }

    return result;
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: 'price' | 'change' | 'volume') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Market Dashboard</h1>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <StockChart data={[]} />
          </div>
          <div>
            <OptionsPanel options={[]} />
          </div>
        </div>

        <StockTable
          stocks={filteredAndSortedStocks}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default Index;
