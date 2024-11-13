import React from 'react';
import { Calendar, Syringe, Stethoscope, Weight, ArrowRight } from 'lucide-react';

const activities = [
  {
    icon: Syringe,
    title: 'Vaccination Complete',
    description: 'Completed vaccination for 24 cattle',
    time: '2 hours ago',
    color: 'blue'
  },
  {
    icon: Weight,
    title: 'Weight Measurement',
    description: 'Recorded weight for 45 sheep',
    time: '4 hours ago',
    color: 'green'
  },
  {
    icon: Stethoscope,
    title: 'Health Check',
    description: 'Routine checkup for poultry',
    time: '6 hours ago',
    color: 'purple'
  },
  {
    icon: Calendar,
    title: 'Schedule Update',
    description: 'Updated feeding schedule',
    time: '8 hours ago',
    color: 'orange'
  }
];

export const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-${activity.color}-100 mt-1`}>
              <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};