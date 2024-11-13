import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, ArrowUpDown } from 'lucide-react';
import AddLivestockForm from './livestock/AddLivestockForm';
import FilterMenu from './livestock/FilterMenu';
import SortMenu from './livestock/SortMenu';
import LivestockTags from './livestock/LivestockTags';

const categories = ['All Livestock', 'Cattle', 'Sheep', 'Goats', 'Pigs'];
const animals = [
  {
    id: 'LV-001',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=120&h=120',
    name: 'Bella',
    category: 'Cattle',
    breed: 'Holstein',
    age: '3 years',
    weight: '720 kg',
    status: 'Healthy',
    tags: [
      { id: 'tag1', label: 'Dairy', color: 'blue' },
      { id: 'tag2', label: 'Premium', color: 'purple' }
    ]
  },
  {
    id: 'LV-002',
    image: 'https://images.unsplash.com/photo-1584935385440-399aa7b19bcd?auto=format&fit=crop&w=120&h=120',
    name: 'Max',
    category: 'Cattle',
    breed: 'Angus',
    age: '2 years',
    weight: '680 kg',
    status: 'Under Treatment',
    tags: [
      { id: 'tag3', label: 'Breeding', color: 'green' }
    ]
  },
  {
    id: 'LV-003',
    image: 'https://images.unsplash.com/photo-1598447067938-8d1b451d4ab7?auto=format&fit=crop&w=120&h=120',
    name: 'Daisy',
    category: 'Sheep',
    breed: 'Merino',
    age: '1.5 years',
    weight: '65 kg',
    status: 'Healthy',
    tags: [
      { id: 'tag4', label: 'Wool', color: 'orange' }
    ]
  }
];

const Livestock = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({
    field: 'name',
    direction: 'asc'
  });

  const handleAddLivestock = (data: any) => {
    console.log('Adding livestock:', data);
    setShowAddForm(false);
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
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredAndSortedAnimals = useMemo(() => {
    let result = [...animals];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(animal => 
        animal.name.toLowerCase().includes(query) ||
        animal.id.toLowerCase().includes(query) ||
        animal.breed.toLowerCase().includes(query)
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter(animal => {
          const animalValue = animal[key as keyof typeof animal];
          return values.includes(String(animalValue).toLowerCase());
        });
      }
    });

    // Apply sort
    result.sort((a, b) => {
      const aValue = String(a[sort.field as keyof typeof a]).toLowerCase();
      const bValue = String(b[sort.field as keyof typeof b]).toLowerCase();
      
      if (sort.direction === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return result;
  }, [animals, searchQuery, filters, sort]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Recent Livestock</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Livestock
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search livestock..."
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
          </button>
          <FilterMenu
            isOpen={showFilterMenu}
            onClose={() => setShowFilterMenu(false)}
            filters={filters}
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
            currentSort={sort}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedAnimals.map((animal) => (
              <tr key={animal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full object-cover" src={animal.image} alt={animal.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{animal.name}</div>
                      <div className="text-sm text-gray-500">{animal.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.breed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    animal.status === 'Healthy' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {animal.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <LivestockTags tags={animal.tags} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <AddLivestockForm onClose={() => setShowAddForm(false)} onSubmit={handleAddLivestock} />
      )}
    </div>
  );
};

export default Livestock;