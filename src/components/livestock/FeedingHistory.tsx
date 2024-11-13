import React from 'react';
import { Calendar, User, Package, Clock, Plus } from 'lucide-react';

interface FeedingRecord {
  id: string;
  animalId: string;
  feedType: string;
  amount: number;
  unit: string;
  timestamp: string;
  staffMember: string;
  notes?: string;
}

interface FeedingHistoryProps {
  animalId: string;
  onAddFeeding: () => void;
}

const FeedingHistory: React.FC<FeedingHistoryProps> = ({ animalId, onAddFeeding }) => {
  const [feedingRecords, setFeedingRecords] = React.useState<FeedingRecord[]>([]);

  React.useEffect(() => {
    const fetchFeedingHistory = async () => {
      try {
        const response = await fetch(`/api/livestock/${animalId}/feeding-history`);
        const data = await response.json();
        setFeedingRecords(data);
      } catch (error) {
        console.error('Error fetching feeding history:', error);
      }
    };

    fetchFeedingHistory();
  }, [animalId]);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Feeding History</h2>
        <button
          onClick={onAddFeeding}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Feeding
        </button>
      </div>
      
      <div className="p-6">
        {feedingRecords.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No feeding records found</p>
        ) : (
          <div className="space-y-4">
            {feedingRecords.map((record) => (
              <div key={record.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{record.feedType}</h3>
                    <span className="text-sm text-gray-500">
                      {record.amount} {record.unit}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(record.timestamp).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(record.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {record.staffMember}
                    </div>
                  </div>
                  {record.notes && (
                    <p className="mt-2 text-sm text-gray-600">{record.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedingHistory;