import React from 'react';
import { Mail, Phone, Edit, Trash2 } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'active' | 'inactive';
  tasks: number;
}

const employees: Employee[] = [
  {
    id: 'EMP001',
    name: 'John Smith',
    role: 'Farm Manager',
    email: 'john.smith@farm.com',
    phone: '+1 234-567-8901',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active',
    tasks: 5
  },
  {
    id: 'EMP002',
    name: 'Sarah Johnson',
    role: 'Veterinarian',
    email: 'sarah.j@farm.com',
    phone: '+1 234-567-8902',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active',
    tasks: 3
  },
  {
    id: 'EMP003',
    name: 'Mike Wilson',
    role: 'Livestock Specialist',
    email: 'mike.w@farm.com',
    phone: '+1 234-567-8903',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'inactive',
    tasks: 0
  }
];

const EmployeeList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Employees</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {employees.map((employee) => (
          <div key={employee.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  employee.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {employee.status}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                {employee.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="h-4 w-4" />
                {employee.phone}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {employee.tasks} active tasks
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;