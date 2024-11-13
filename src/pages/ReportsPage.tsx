import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Download, 
  Filter,
  Search,
  ArrowUpDown,
  Activity,
  ClipboardList,
  Package,
  Beef,
  Users
} from 'lucide-react';
import FilterMenu from '../components/reports/FilterMenu';
import SortMenu from '../components/reports/SortMenu';
import ActivityTimeline from '../components/reports/ActivityTimeline';
import ReportCard from '../components/reports/ReportCard';
import DateRangePicker from '../components/reports/DateRangePicker';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('activity');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleExport = () => {
    console.log('Exporting report...');
  };

  const reportTypes = [
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'tasks', label: 'Task History', icon: ClipboardList },
    { id: 'inventory', label: 'Inventory Changes', icon: Package },
    { id: 'livestock', label: 'Livestock Updates', icon: Beef },
    { id: 'staff', label: 'Staff Reports', icon: Users }
  ];

  const summaryCards = [
    {
      title: 'Total Activities',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      color: 'blue'
    },
    {
      title: 'Tasks Completed',
      value: '456',
      change: '+8%',
      trend: 'up',
      color: 'green'
    },
    {
      title: 'Inventory Updates',
      value: '89',
      change: '+5%',
      trend: 'up',
      color: 'purple'
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '-15%',
      trend: 'down',
      color: 'yellow'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Track and analyze farm activities</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="h-5 w-5" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <ReportCard key={index} {...card} />
        ))}
      </div>

      {/* Report Types Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === type.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <type.icon className="h-5 w-5" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <DateRangePicker
          startDate={dateRange.start}
          endDate={dateRange.end}
          onDateChange={setDateRange}
        />

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
            onFilterChange={(filters) => console.log('Filters:', filters)}
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
            onSortChange={(sort) => console.log('Sort:', sort)}
          />
        </div>
      </div>

      {/* Activity Timeline */}
      <ActivityTimeline />
    </div>
  );
};

export default ReportsPage;