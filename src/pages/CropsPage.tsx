import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, ArrowUpDown, Calendar, Leaf, Droplet, Sun, Wind } from 'lucide-react';
import CropList from '../components/crops/CropList';
import AddCropForm from '../components/crops/AddCropForm';
import EditCropForm from '../components/crops/EditCropForm';
import CropCalendar from '../components/crops/CropCalendar';
import FilterMenu from '../components/crops/FilterMenu';
import SortMenu from '../components/crops/SortMenu';

// Sample data - in a real app this would come from an API
const crops = [
  {
    id: 'CROP001',
    name: 'Organic Corn',
    variety: 'Sweet Corn',
    field: 'Field A',
    plantingDate: '2024-03-01',
    expectedHarvest: '2024-07-15',
    status: 'growing',
    health: 'good',
    area: '5 acres',
    progress: 45
  },
  {
    id: 'CROP002',
    name: 'Soybeans',
    variety: 'Round-up Ready',
    field: 'Field B',
    plantingDate: '2024-03-15',
    expectedHarvest: '2024-08-30',
    status: 'growing',
    health: 'excellent',
    area: '10 acres',
    progress: 35
  },
  {
    id: 'CROP003',
    name: 'Winter Wheat',
    variety: 'Hard Red',
    field: 'Field C',
    plantingDate: '2023-10-01',
    expectedHarvest: '2024-06-15',
    status: 'growing',
    health: 'fair',
    area: '7 acres',
    progress: 75
  }
];

const CropsPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState<any>(null);
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    status: [],
    health: [],
    field: []
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'name',
    direction: 'asc' as 'asc' | 'desc'
  });

  const handleAddCrop = (data: any) => {
    console.log('Adding crop:', data);
    setShowAddForm(false);
  };

  const handleEditCrop = (data: any) => {
    console.log('Updating crop:', data);
    setEditingCrop(null);
  };

  const handleFilterChange = (sectionId: string, value: string) => {
    setFilters(prev => {
      const sectionFilters = prev[sectionId] || [];
      const newFilters = sectionFilters.includes(value)
        ? sectionFilters.filter(v => v !== value)
        : [...sectionFilters, value];
      
      return {
        ...prev,
        [sectionId]: newFilters
      };
    });
  };

  const handleSortChange = (field: string) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredAndSortedCrops = useMemo(() => {
    let result = [...crops];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(crop => 
        crop.name.toLowerCase().includes(query) ||
        crop.variety.toLowerCase().includes(query) ||
        crop.field.toLowerCase().includes(query)
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter(crop => {
          const cropValue = crop[key as keyof typeof crop];
          return values.includes(String(cropValue).toLowerCase());
        });
      }
    });

    // Apply sort
    result.sort((a, b) => {
      const aValue = String(a[sortConfig.field as keyof typeof a]).toLowerCase();
      const bValue = String(b[sortConfig.field as keyof typeof b]).toLowerCase();
      
      if (sortConfig.direction === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return result;
  }, [crops, searchQuery, filters, sortConfig]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crop Management</h1>
          <p className="text-gray-500 mt-1">Manage your farm's crop plantings and harvests</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Crop
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Crops</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Droplet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Irrigation Active</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Sun className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Growing Days</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Wind className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Next Harvest</p>
              <p className="text-2xl font-bold text-gray-900">7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <input
              type="text"
              placeholder="Search crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 text-gray-500" />
              Filters
              {Object.values(filters).flat().length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                  {Object.values(filters).flat().length}
                </span>
              )}
            </button>
            <FilterMenu
              isOpen={showFilterMenu}
              onClose={() => setShowFilterMenu(false)}
              selectedFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <ArrowUpDown className="h-5 w-5 text-gray-500" />
              Sort
            </button>
            <SortMenu
              isOpen={showSortMenu}
              onClose={() => setShowSortMenu(false)}
              currentSort={sortConfig}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'list'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'calendar'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Main Content */}
      {activeView === 'list' ? (
        <CropList crops={filteredAndSortedCrops} onEdit={setEditingCrop} />
      ) : (
        <CropCalendar />
      )}

      {/* Forms */}
      {showAddForm && (
        <AddCropForm onClose={() => setShowAddForm(false)} onSubmit={handleAddCrop} />
      )}
      {editingCrop && (
        <EditCropForm
          crop={editingCrop}
          onClose={() => setEditingCrop(null)}
          onSubmit={handleEditCrop}
        />
      )}
    </div>
  );
};

export default CropsPage;