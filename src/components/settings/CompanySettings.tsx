import React, { useState } from 'react';
import { Building, MapPin, Globe, Phone, Mail, Camera, Bell } from 'lucide-react';

interface CompanySettingsProps {
  companyInfo?: any;
  onUpdate: (data: any) => void;
}

const defaultCompanyInfo = {
  name: '',
  logo: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=200&h=200',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  phone: '',
  email: '',
  website: '',
  description: '',
  established: '',
  size: '',
  employeeCount: '',
  farmType: 'mixed', // Default farm type
  announcement: {
    enabled: false,
    message: '',
    type: 'info'
  }
};

const CompanySettings = ({ companyInfo = defaultCompanyInfo, onUpdate }: CompanySettingsProps) => {
  const [formData, setFormData] = useState(companyInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your farm's details and settings</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Logo Upload */}
        <div className="flex items-center gap-6">
          <img
            src={formData.logo}
            alt={formData.name}
            className="h-24 w-24 rounded-lg object-cover"
          />
          <div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Camera className="h-5 w-5 text-gray-500" />
                Change Logo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Recommended: Square image, at least 200x200px
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Farm Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="farmType" className="block text-sm font-medium text-gray-700">
              Farm Type
            </label>
            <select
              id="farmType"
              value={formData.farmType}
              onChange={(e) => setFormData({ ...formData, farmType: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="mixed">Mixed Farming</option>
              <option value="livestock">Livestock Only</option>
              <option value="crops">Crops Only</option>
              <option value="dairy">Dairy Farm</option>
              <option value="organic">Organic Farm</option>
            </select>
          </div>

          <div>
            <label htmlFor="established" className="block text-sm font-medium text-gray-700">
              Established Year
            </label>
            <input
              type="text"
              id="established"
              value={formData.established}
              onChange={(e) => setFormData({ ...formData, established: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700">
              Farm Size
            </label>
            <input
              type="text"
              id="size"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 500 acres"
            />
          </div>

          <div>
            <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700">
              Number of Employees
            </label>
            <input
              type="number"
              id="employeeCount"
              value={formData.employeeCount}
              onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              min="1"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Farm Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us about your farm..."
          />
        </div>

        {/* Announcement Settings */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Company Announcement</h3>
              <p className="text-sm text-gray-500 mt-1">
                Display important messages to all users
              </p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  announcement: {
                    ...formData.announcement,
                    enabled: !formData.announcement.enabled
                  }
                })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.announcement.enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.announcement.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {formData.announcement.enabled && (
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="announcement" className="block text-sm font-medium text-gray-700">
                  Announcement Message
                </label>
                <textarea
                  id="announcement"
                  rows={3}
                  value={formData.announcement.message}
                  onChange={(e) => setFormData({
                    ...formData,
                    announcement: {
                      ...formData.announcement,
                      message: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="announcementType" className="block text-sm font-medium text-gray-700">
                  Announcement Type
                </label>
                <select
                  id="announcementType"
                  value={formData.announcement.type}
                  onChange={(e) => setFormData({
                    ...formData,
                    announcement: {
                      ...formData.announcement,
                      type: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="info">Information</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanySettings;