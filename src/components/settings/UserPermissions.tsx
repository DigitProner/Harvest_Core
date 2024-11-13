import React, { useState } from 'react';
import { Users, Shield, Plus, Search, Edit2, Trash2, Check, X } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

const defaultPermissions: Permission[] = [
  // Livestock Permissions
  { id: 'livestock-view', name: 'View Livestock', description: 'Can view livestock records', module: 'Livestock' },
  { id: 'livestock-add', name: 'Add Livestock', description: 'Can add new livestock', module: 'Livestock' },
  { id: 'livestock-edit', name: 'Edit Livestock', description: 'Can edit livestock details', module: 'Livestock' },
  { id: 'livestock-delete', name: 'Delete Livestock', description: 'Can delete livestock records', module: 'Livestock' },
  
  // Inventory Permissions
  { id: 'inventory-view', name: 'View Inventory', description: 'Can view inventory items', module: 'Inventory' },
  { id: 'inventory-manage', name: 'Manage Inventory', description: 'Can add/edit inventory items', module: 'Inventory' },
  
  // Staff Permissions
  { id: 'staff-view', name: 'View Staff', description: 'Can view staff members', module: 'Staff' },
  { id: 'staff-manage', name: 'Manage Staff', description: 'Can manage staff members', module: 'Staff' },
  
  // Reports Permissions
  { id: 'reports-view', name: 'View Reports', description: 'Can view reports', module: 'Reports' },
  { id: 'reports-create', name: 'Create Reports', description: 'Can create new reports', module: 'Reports' },
  
  // Settings Permissions
  { id: 'settings-view', name: 'View Settings', description: 'Can view system settings', module: 'Settings' },
  { id: 'settings-manage', name: 'Manage Settings', description: 'Can modify system settings', module: 'Settings' }
];

const defaultRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    permissions: defaultPermissions
  },
  {
    id: 'manager',
    name: 'Farm Manager',
    description: 'Can manage farm operations',
    permissions: defaultPermissions.filter(p => !p.id.includes('settings-manage'))
  },
  {
    id: 'staff',
    name: 'Staff Member',
    description: 'Basic access to daily operations',
    permissions: defaultPermissions.filter(p => p.id.includes('view'))
  }
];

const UserPermissions = () => {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddRole = (newRole: Role) => {
    setRoles([...roles, { ...newRole, id: `role-${Date.now()}` }]);
    setShowAddRole(false);
  };

  const handleEditRole = (updatedRole: Role) => {
    setRoles(roles.map(role => role.id === updatedRole.id ? updatedRole : role));
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const RoleForm = ({ role, onSubmit, onCancel }: { role?: Role; onSubmit: (role: Role) => void; onCancel: () => void }) => {
    const [formData, setFormData] = useState<Role>(role || {
      id: '',
      name: '',
      description: '',
      permissions: []
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const togglePermission = (permission: Permission) => {
      const hasPermission = formData.permissions.some(p => p.id === permission.id);
      setFormData({
        ...formData,
        permissions: hasPermission
          ? formData.permissions.filter(p => p.id !== permission.id)
          : [...formData.permissions, permission]
      });
    };

    // Group permissions by module
    const groupedPermissions = defaultPermissions.reduce((acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = [];
      }
      acc[permission.module].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {role ? 'Edit Role' : 'Add New Role'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Configure role permissions
              </p>
            </div>
            <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Role Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Permissions</h3>
                <div className="space-y-6">
                  {Object.entries(groupedPermissions).map(([module, permissions]) => (
                    <div key={module} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">{module}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {permissions.map((permission) => (
                          <label key={permission.id} className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                checked={formData.permissions.some(p => p.id === permission.id)}
                                onChange={() => togglePermission(permission)}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                            </div>
                            <div className="ml-3">
                              <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                              <p className="text-xs text-gray-500">{permission.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {role ? 'Save Changes' : 'Create Role'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">User Roles & Permissions</h2>
        <p className="text-sm text-gray-500 mt-1">Manage access levels and permissions for different user roles</p>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => setShowAddRole(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Role
          </button>
        </div>

        <div className="space-y-4">
          {roles
            .filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((role) => (
              <div
                key={role.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{role.name}</h3>
                      <p className="text-sm text-gray-500">{role.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {role.permissions.length > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            {role.permissions.length} Permissions
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingRole(role)}
                      className="p-1 hover:bg-white rounded"
                    >
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </button>
                    {role.id !== 'admin' && (
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-1 hover:bg-white rounded"
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {(showAddRole || editingRole) && (
        <RoleForm
          role={editingRole || undefined}
          onSubmit={editingRole ? handleEditRole : handleAddRole}
          onCancel={() => {
            setShowAddRole(false);
            setEditingRole(null);
          }}
        />
      )}
    </div>
  );
};

export default UserPermissions;