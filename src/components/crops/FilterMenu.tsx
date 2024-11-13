import React from 'react';
import { X, Check } from 'lucide-react';

interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (sectionId: string, value: string) => void;
}

const filterSections = [
  {
    id: 'status',
    label: 'Status',
    options: [
      { label: 'Growing', value: 'growing' },
      { label: 'Harvested', value: 'harvested' },
      { label: 'Planned', value: 'planned' }
    ]
  },
  {
    id: 'health',
    label: 'Health',
    options: [
      { label: 'Excellent', value: 'excellent' },
      { label: 'Good', value: 'good' },
      { label: 'Fair', value: 'fair' },
      { label: 'Poor', value: 'poor' }
    ]
  },
  {
    id: 'field',
    label: 'Field',
    options: [
      { label: 'Field A', value: 'field-a' },
      { label: 'Field B', value: 'field-b' },
      { label: 'Field C', value: 'field-c' }
    ]
  }
];

const FilterMenu: React.FC<FilterMenuProps> = ({ isOpen, onClose, selectedFilters, onFilterChange }) => {
  if (!isOpen) return null;

  const clearAllFilters = () => {
    filterSections.forEach(section => {
      section.options.forEach(option => {
        if (selectedFilters[section.id]?.includes(option.value)) {
          onFilterChange(section.id, option.value);
        }
      });
    });
  };

  return (
    <div className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Filters</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4 space-y-6">
        {filterSections.map((section) => (
          <div key={section.id}>
            <h4 className="text-sm font-medium text-gray-900 mb-2">{section.label}</h4>
            <div className="space-y-2">
              {section.options.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedFilters[section.id]?.includes(option.value) || false}
                    onChange={() => onFilterChange(section.id, option.value)}
                  />
                  <div className={`flex items-center justify-center w-4 h-4 border rounded mr-2 transition-colors duration-200 ${
                    selectedFilters[section.id]?.includes(option.value)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedFilters[section.id]?.includes(option.value) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-end">
        <button
          onClick={clearAllFilters}
          className="text-sm text-gray-600 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;