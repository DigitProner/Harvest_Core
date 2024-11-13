import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import AddFeedingRecord from './AddFeedingRecord';

interface FeedingRecord {
  id: number;
  livestock_id: number;
  feed_name: string;
  feed_type: string;
  quantity: number;
  fed_by: string;
  fed_at: string;
  notes?: string;
}

const FeedingRecords = () => {
  const [records, setRecords] = useState<FeedingRecord[]>([]);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/feeding/records');
      if (!response.ok) throw new Error('Failed to fetch records');
      const data = await response.json();
      setRecords(data);
    } catch (err) {
      setError('Failed to load feeding records');
      console.error('Error fetching records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (data: any) => {
    try {
      const response = await fetch('/api/feeding/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Failed to add record');
      
      await fetchRecords();
      setShowAddRecord(false);
    } catch (err) {
      console.error('Error adding record:', err);
      setError('Failed to add feeding record');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Feeding Records</h2>
        <button
          onClick={() => setShowAddRecord(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Record
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Livestock ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fed By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.livestock_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{record.feed_name}</div>
                  <div className="text-sm text-gray-500">{record.feed_type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.fed_by}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(record.fed_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {record.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddRecord && (
        <AddFeedingRecord
          onClose={() => setShowAddRecord(false)}
          onSubmit={handleAddRecord}
        />
      )}
    </div>
  );
};

export default FeedingRecords;