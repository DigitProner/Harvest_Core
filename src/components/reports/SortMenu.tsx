import React from 'react';
import { X, ArrowUpDown } from 'lucide-react';

interface SortMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (sort: { field: string; direction: 'asc' | 'desc' }) => void;
}

const sortOptions = [
  { label: 'Date', value: 'date' },
  { label: 'Type', value: 'type' },
  { label: 'Status', value: 'status' },
  { label: 'User', value: 'user' }
];

const SortMenu = ({ isOpen, onClose, onSortChange }: SortMenuProps) => {
  const [currentSort, setCurrentSort] = React.useState({
    field: 'date',
    direction: 'desc' as 'asc' | 'desc'
  });

  const handleSort = (field: string) => {
    const direction = currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc';
    const newSort = { field, direction };
    setCurrentSort(newSort);
    onSortChange(newSort);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Sort By</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSort(option.value)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <span>{option.label}</span>
            {currentSort.field === option.value && (
              <div className="flex items-center text-blue-600">
                <ArrowUpDown className="h-4 w-4" />
                <span className="ml-2 text-xs">
                  {currentSort.direction === 'asc' ? 'A to Z' : 'Z to A'}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortMenu;