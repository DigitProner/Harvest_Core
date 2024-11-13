import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import EmployeeList from '../components/staff/EmployeeList';
import TaskList from '../components/staff/TaskList';
import EmployeeForm from '../components/staff/EmployeeForm';
import TaskForm from '../components/staff/TaskForm';

const StaffPage = () => {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleCreateEmployee = (data: any) => {
    console.log('Creating employee:', data);
    setShowEmployeeForm(false);
  };

  const handleCreateTask = (data: any) => {
    console.log('Creating task:', data);
    setShowTaskForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-500 mt-1">Manage employees and assign tasks</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowTaskForm(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Plus className="h-5 w-5 text-gray-500" />
            Create Task
          </button>
          <button
            onClick={() => setShowEmployeeForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5 text-gray-500" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EmployeeList />
        </div>
        <div>
          <TaskList />
        </div>
      </div>

      {showEmployeeForm && (
        <EmployeeForm onClose={() => setShowEmployeeForm(false)} onSubmit={handleCreateEmployee} />
      )}
      {showTaskForm && (
        <TaskForm onClose={() => setShowTaskForm(false)} onSubmit={handleCreateTask} />
      )}
    </div>
  );
};

export default StaffPage;