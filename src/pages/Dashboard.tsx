import React from 'react';
import { AnimalStats } from '../components/AnimalStats';
import { HealthOverview } from '../components/HealthOverview';
import { RecentActivity } from '../components/RecentActivity';
import Livestock from '../components/Livestock';
import CompanyAnnouncement from '../components/CompanyAnnouncement';
import WeatherWidget from '../components/WeatherWidget';
import { Building, MapPin, Users } from 'lucide-react';

const Dashboard = () => {
  // This would typically come from your global state or API
  const companyInfo = {
    name: 'Green Valley Farm',
    address: '1234 Farm Road, Springfield, IL',
    size: '500 acres',
    employeeCount: '25',
    location: {
      latitude: 39.7817, // Springfield, IL coordinates
      longitude: -89.6501
    },
    announcement: {
      enabled: true,
      message: 'Important: Annual farm inspection scheduled for next week.',
      type: 'info' as const
    }
  };

  return (
    <div className="space-y-6">
      {/* Company Announcement */}
      {companyInfo.announcement.enabled && (
        <CompanyAnnouncement
          message={companyInfo.announcement.message}
          type={companyInfo.announcement.type}
        />
      )}

      {/* Company Overview and Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{companyInfo.name}</h1>
                <div className="flex items-center gap-4 mt-1 text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{companyInfo.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{companyInfo.employeeCount} employees</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500">Farm Size</div>
                <div className="text-2xl font-semibold text-gray-900 mt-1">{companyInfo.size}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <WeatherWidget 
            latitude={companyInfo.location.latitude} 
            longitude={companyInfo.location.longitude} 
          />
        </div>
      </div>

      <AnimalStats />
      <Livestock />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthOverview />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;