import React, { useState } from 'react';
import { Building, MapPin, Globe, Phone, Mail, Camera, Bell, Users, Shield, CreditCard } from 'lucide-react';
import UserPermissions from '../components/settings/UserPermissions';
import CompanySettings from '../components/settings/CompanySettings';
import BillingSettings from '../components/settings/BillingSettings';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Green Valley Farm',
    logo: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=200&h=200',
    address: '1234 Farm Road',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    email: 'contact@greenvalleyfarm.com',
    website: 'www.greenvalleyfarm.com',
    description: 'Family-owned farm specializing in sustainable agriculture and livestock management.',
    established: '1985',
    size: '500 acres',
    employeeCount: '25',
    announcement: {
      enabled: true,
      message: 'Important: Annual farm inspection scheduled for next week.',
      type: 'info' as const
    }
  });

  const handleCompanyUpdate = (data: any) => {
    setCompanyInfo(data);
    // Here you would typically make an API call to update the company information
    console.log('Updating company information:', data);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'company':
        return <CompanySettings companyInfo={companyInfo} onUpdate={handleCompanyUpdate} />;
      case 'users':
        return <UserPermissions />;
      case 'billing':
        return <BillingSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm">
            <nav className="divide-y divide-gray-200">
              <button
                onClick={() => setActiveTab('company')}
                className={`flex items-center gap-3 px-4 py-3 w-full text-left ${
                  activeTab === 'company'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Building className="h-5 w-5" />
                <span className="font-medium">Company</span>
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center gap-3 px-4 py-3 w-full text-left ${
                  activeTab === 'users'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Users & Permissions</span>
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`flex items-center gap-3 px-4 py-3 w-full text-left ${
                  activeTab === 'billing'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>Billing</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 w-full text-left ${
                  activeTab === 'security'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-9">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;