import React, { useState, useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';

interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  category: string[];
  status: string[];
  breed: string[];
  age: string[];
}

const filterSections = [
  {
    id: 'category',
    label: 'Category',
    options: [
      { label: 'Cattle', value: 'cattle' },
      { label: 'Sheep', value: 'sheep' },
      { label: 'Goats', value: 'goats' },
      { label: 'Pigs', value: 'pigs' }
    ]
  },
  {
    id: 'status',
    label: 'Health Status',
    options: [
      { label: 'Healthy', value: 'healthy' },
      { label: 'Under Treatment', value: 'treatment' },
      { label: 'Critical', value: 'critical' }
    ]
  },
  {
    id: 'breed',
    label: 'Breed',
    options: [
      { label: 'Holstein', value: 'holstein' },
      { label: 'Angus', value: 'angus' },
      { label: 'Merino', value: 'merino' }
    ]
  },
  {
    id: 'age',
    label: 'Age',
    options: [
      { label: '0-1 year', value: '0-1' },
      { label: '1-3 years', value: '1-3' },
      { label: '3+ years', value: '3+' }
    ]
  }
];

const FilterMenu = ({ isOpen, onClose, onFilterChange }: FilterMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    category: [],
    status: [],
    breed: [],
    age: []
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleFilterChange = (sectionId: keyof FilterState, value: string) => {
    const newFilters = { ...selectedFilters };
    if (newFilters[sectionId].includes(value)) {
      newFilters[sectionId] = newFilters[sectionId].filter(v => v !== value);
    } else {
      newFilters[sectionId] = [...newFilters[sectionId], value];
    }
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: [],
      status: [],
      breed: [],
      age: []
    };
    setSelectedFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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
                    checked={selectedFilters[section.id as keyof FilterState].includes(option.value)}
                    onChange={() => handleFilterChange(section.id as keyof FilterState, option.value)}
                  />
                  <div className={`flex items-center justify-center w-4 h-4 border rounded mr-2 transition-colors duration-200 ${
                    selectedFilters[section.id as keyof FilterState].includes(option.value)
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedFilters[section.id as keyof FilterState].includes(option.value) && (
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
          onClick={clearFilters}
          className="text-sm text-gray-600 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;