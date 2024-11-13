import React from 'react';
import { Cow, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';

const Dashboard = () => {
  return (
    <main className="ml-64 pt-16 min-h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Farm Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Animals"
            value={248}
            icon={Cow}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Health Checks"
            value={52}
            icon={Activity}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Alerts"
            value={3}
            icon={AlertTriangle}
            trend={{ value: 2, isPositive: false }}
          />
          <StatsCard
            title="Production"
            value="1,234 L"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <activity.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Health Overview</h2>
            <div className="space-y-4">
              {healthStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{stat.label}</span>
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-900 font-medium">{stat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const activities = [
  { icon: Activity, title: 'Health check completed for Barn A', time: '2 hours ago' },
  { icon: Cow, title: 'New cattle added to inventory', time: '4 hours ago' },
  { icon: AlertTriangle, title: 'Vaccination due for 12 animals', time: '6 hours ago' },
];

const healthStats = [
  { label: 'Healthy', percentage: 85 },
  { label: 'Under Observation', percentage: 10 },
  { label: 'Needs Attention', percentage: 5 },
];

export default Dashboard;