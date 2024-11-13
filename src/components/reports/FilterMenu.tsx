import React, { useState, useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';

interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const filterSections = [
  {
    id: 'type',
    label: 'Activity Type',
    options: [
      { label: 'Tasks', value: 'task' },
      { label: 'Alerts', value: 'alert' },
      { label: 'Inventory', value: 'inventory' },
      { label: 'Livestock', value: 'livestock' },
      { label: 'Staff', value: 'staff' }
    ]
  },
  {
    id: 'status',
    label: 'Status',
    options: [
      { label: 'Completed', value: 'completed' },
      { label: 'Warning', value: 'warning' },
      { label: 'Information', value: 'info' }
    ]
  },
  {
    id: 'user',
    label: 'User',
    options: [
      { label: 'John Smith', value: 'john' },
      { label: 'Sarah Johnson', value: 'sarah' },
      { label: 'Mike Wilson', value: 'mike' },
      { label: 'System', value: 'system' }
    ]
  }
];

const FilterMenu = ({ isOpen, onClose, onFilterChange }: FilterMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

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

  const handleFilterChange = (sectionId: string, value: string) => {
    setSelectedFilters(prev => {
      const sectionFilters = prev[sectionId] || [];
      const newFilters = sectionFilters.includes(value)
        ? sectionFilters.filter(v => v !== value)
        : [...sectionFilters, value];
      
      const updated = {
        ...prev,
        [sectionId]: newFilters
      };
      
      onFilterChange(updated);
      return updated;
    });
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
                    checked={selectedFilters[section.id]?.includes(option.value) || false}
                    onChange={() => handleFilterChange(section.id, option.value)}
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
          onClick={() => {
            setSelectedFilters({});
            onFilterChange({});
          }}
          className="text-sm text-gray-600 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;