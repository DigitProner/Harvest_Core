import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpDown, Download, Upload, Users } from 'lucide-react';
import GroupList from '../components/livestock/GroupList';
import GroupForm from '../components/livestock/GroupForm';
import AddLivestockForm from '../components/livestock/AddLivestockForm';
import EditLivestockForm from '../components/livestock/EditLivestockForm';
import LivestockTags from '../components/livestock/LivestockTags';
import FilterMenu from '../components/livestock/FilterMenu';
import SortMenu from '../components/livestock/SortMenu';
import FeedInventory from '../components/livestock/FeedInventory';

const categories = ['All Livestock', 'Cattle', 'Sheep', 'Goats', 'Pigs'];

const LivestockPage = () => {
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showAddLivestockForm, setShowAddLivestockForm] = useState(false);
  const [editingLivestock, setEditingLivestock] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleCreateGroup = (data: any) => {
    console.log('Creating group:', data);
    setShowGroupForm(false);
  };

  const handleAddLivestock = (data: any) => {
    console.log('Adding livestock:', data);
    setShowAddLivestockForm(false);
  };

  const handleEditLivestock = (data: any) => {
    console.log('Updating livestock:', data);
    setEditingLivestock(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Livestock Management</h1>
          <p className="text-gray-500 mt-1">Manage and monitor your farm animals</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowGroupForm(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Users className="h-5 w-5 text-gray-500" />
            Create Group
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5 text-gray-500" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Upload className="h-5 w-5 text-gray-500" />
            Import
          </button>
          <button 
            onClick={() => setShowAddLivestockForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Livestock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  index === 0 ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 my-6">
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
                filters={{}}
                onFilterChange={() => {}}
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
                currentSort={{ field: 'name', direction: 'asc' }}
                onSortChange={() => {}}
              />
            </div>
          </div>

          <FeedInventory />
        </div>

        <div>
          <GroupList />
        </div>
      </div>

      {showGroupForm && (
        <GroupForm onClose={() => setShowGroupForm(false)} onSubmit={handleCreateGroup} />
      )}
      {showAddLivestockForm && (
        <AddLivestockForm onClose={() => setShowAddLivestockForm(false)} onSubmit={handleAddLivestock} />
      )}
      {editingLivestock && (
        <EditLivestockForm
          livestock={editingLivestock}
          onClose={() => setEditingLivestock(null)}
          onSubmit={handleEditLivestock}
        />
      )}
    </div>
  );
};

export default LivestockPage;