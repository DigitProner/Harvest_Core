import React from 'react';
import { X, ArrowUpDown } from 'lucide-react';

interface SortMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (field: string) => void;
}

const sortOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Planting Date', value: 'plantingDate' },
  { label: 'Harvest Date', value: 'expectedHarvest' },
  { label: 'Status', value: 'status' },
  { label: 'Health', value: 'health' },
  { label: 'Progress', value: 'progress' }
];

const SortMenu: React.FC<SortMenuProps> = ({ isOpen, onClose, onSortChange }) => {
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
            onClick={() => {
              onSortChange(option.value);
              onClose();
            }}
            className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <span>{option.label}</span>
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortMenu;