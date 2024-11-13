import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Package, 
  Users, 
  Beef,
  Calendar
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'task',
    title: 'Morning Health Check Completed',
    description: 'Completed health inspection for Barn A',
    timestamp: '2 hours ago',
    user: 'John Smith',
    status: 'completed',
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-100'
  },
  {
    id: 2,
    type: 'alert',
    title: 'Low Feed Stock Alert',
    description: 'Cattle feed inventory below threshold',
    timestamp: '4 hours ago',
    user: 'System',
    status: 'warning',
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-yellow-100'
  },
  {
    id: 3,
    type: 'inventory',
    title: 'Inventory Updated',
    description: 'Added 500kg of organic feed to stock',
    timestamp: '6 hours ago',
    user: 'Sarah Johnson',
    status: 'info',
    icon: Package,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100'
  },
  {
    id: 4,
    type: 'livestock',
    title: 'New Livestock Added',
    description: 'Registered 5 new cattle to the system',
    timestamp: '1 day ago',
    user: 'Mike Wilson',
    status: 'info',
    icon: Beef,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-100'
  }
];

const ActivityTimeline = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
      </div>
      
      <div className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, index) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full ${activity.bgColor} flex items-center justify-center ring-8 ring-white`}>
                        <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>{activity.description}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {activity.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;