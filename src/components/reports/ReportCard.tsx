import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ReportCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

const ReportCard = ({ title, value, change, trend, color }: ReportCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`ml-2 flex items-center text-sm ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {change}
        </p>
      </div>
      <div className="mt-4">
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className={`h-2 rounded-full bg-${color}-500`}
            style={{ width: '75%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportCard;