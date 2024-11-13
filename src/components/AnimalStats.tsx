import React from 'react';
import { Beef, Bird, Fish, Cat } from 'lucide-react';

const statCards = [
  { icon: Beef, label: 'Total Livestock', value: '247', change: '+12%', color: 'blue' },
  { icon: Bird, label: 'Poultry', value: '1,432', change: '+8%', color: 'green' },
  { icon: Fish, label: 'Aquaculture', value: '865', change: '+5%', color: 'purple' },
  { icon: Cat, label: 'Other Animals', value: '156', change: '+3%', color: 'orange' }
];

export const AnimalStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-${card.color}-100`}>
              <card.icon className={`h-6 w-6 text-${card.color}-600`} />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm font-medium text-${card.color}-600`}>
              {card.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};