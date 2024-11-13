import React from 'react';
import { Users, ChevronRight, Edit, Trash2 } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  animalCount: number;
  category: string;
}

const groups: Group[] = [
  {
    id: 'G1',
    name: 'Dairy Cattle A',
    description: 'Main dairy production group',
    animalCount: 45,
    category: 'Cattle'
  },
  {
    id: 'G2',
    name: 'Breeding Stock',
    description: 'Premium breeding cattle',
    animalCount: 28,
    category: 'Cattle'
  },
  {
    id: 'G3',
    name: 'Wool Sheep',
    description: 'Merino wool production',
    animalCount: 120,
    category: 'Sheep'
  }
];

const GroupList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Livestock Groups</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {groups.map((group) => (
          <div key={group.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{group.animalCount} animals</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;