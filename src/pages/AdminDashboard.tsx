import React, { useState, useEffect } from 'react';
import { Users, Building, Search, Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import CompanyForm from '../components/admin/CompanyForm';
import UserForm from '../components/admin/UserForm';

interface Company {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  subscription: string;
  userCount: number;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'companies' | 'users'>('companies');
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'companies') {
        const response = await fetch('/api/admin/companies', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setCompanies(data);
      } else {
        const response = await fetch('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await fetch(`/api/admin/${activeTab}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      await fetch(`/api/admin/${activeTab}${editingItem ? `/${editingItem.id}` : ''}`, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
      setShowCompanyForm(false);
      setShowUserForm(false);
      setEditingItem(null);
      fetchData();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage companies and users</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-6 py-4 flex items-center gap-2 font-medium text-sm border-b-2 ${
                activeTab === 'companies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building className="h-5 w-5" />
              Companies
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 flex items-center gap-2 font-medium text-sm border-b-2 ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="h-5 w-5" />
              Users
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => activeTab === 'companies' ? setShowCompanyForm(true) : setShowUserForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Add {activeTab === 'companies' ? 'Company' : 'User'}
            </button>
          </div>

          {activeTab === 'companies' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {companies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          company.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {company.status === 'active' ? (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          ) : (
                            <XCircle className="h-4 w-4 mr-1" />
                          )}
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.subscription}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {company.userCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(company.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingItem(company);
                              setShowCompanyForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(company.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.companyId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 'active' ? (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          ) : (
                            <XCircle className="h-4 w-4 mr-1" />
                          )}
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingItem(user);
                              setShowUserForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showCompanyForm && (
        <CompanyForm
          company={editingItem}
          onClose={() => {
            setShowCompanyForm(false);
            setEditingItem(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      {showUserForm && (
        <UserForm
          user={editingItem}
          onClose={() => {
            setShowUserForm(false);
            setEditingItem(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;