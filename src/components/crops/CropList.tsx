import React from 'react';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';

interface CropListProps {
  crops: any[];
  onEdit: (crop: any) => void;
}

const CropList: React.FC<CropListProps> = ({ crops, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'growing':
        return 'bg-green-100 text-green-800';
      case 'harvested':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'fair':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {crops.map((crop) => (
              <tr key={crop.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                    <div className="text-sm text-gray-500">{crop.variety}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{crop.field}</div>
                  <div className="text-sm text-gray-500">{crop.area}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Planted: {new Date(crop.plantingDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Harvest: {new Date(crop.expectedHarvest).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(crop.status)}`}>
                    {crop.status}
                  </span>
                  <div className={`text-sm mt-1 ${getHealthColor(crop.health)}`}>
                    {crop.health}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${crop.progress}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {crop.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(crop)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CropList;