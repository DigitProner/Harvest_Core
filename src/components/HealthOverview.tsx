import React from 'react';
import { Activity, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const healthStats = [
  { status: 'Healthy', count: 1850, icon: CheckCircle2, color: 'green' },
  { status: 'Under Treatment', count: 45, icon: Activity, color: 'yellow' },
  { status: 'Critical', count: 12, icon: AlertCircle, color: 'red' },
  { status: 'Pending Checkup', count: 89, icon: Clock, color: 'blue' }
];

export const HealthOverview = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Overview</h2>
      <div className="space-y-4">
        {healthStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{stat.status}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{stat.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};