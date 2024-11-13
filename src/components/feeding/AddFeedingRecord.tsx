import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface FeedInventoryItem {
  id: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
}

interface AddFeedingRecordProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddFeedingRecord = ({ onClose, onSubmit }: AddFeedingRecordProps) => {
  const [feedInventory, setFeedInventory] = useState<FeedInventoryItem[]>([]);
  const [formData, setFormData] = useState({
    livestock_id: '',
    feed_id: '',
    quantity: '',
    fed_by: '',
    notes: ''
  });

  useEffect(() => {
    fetchFeedInventory();
  }, []);

  const fetchFeedInventory = async () => {
    try {
      const response = await fetch('/api/feeding/inventory');
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setFeedInventory(data);
    } catch (err) {
      console.error('Error fetching feed inventory:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      livestock_id: Number(formData.livestock_id),
      feed_id: Number(formData.feed_id),
      quantity: Number(formData.quantity)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Feeding Record</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="livestock_id" className="block text-sm font-medium text-gray-700">
              Livestock ID
            </label>
            <input
              type="number"
              id="livestock_id"
              value={formData.livestock_id}
              onChange={(e) => setFormData({ ...formData, livestock_id: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="feed_id" className="block text-sm font-medium text-gray-700">
              Feed Type
            </label>
            <select
              id="feed_id"
              value={formData.feed_id}
              onChange={(e) => setFormData({ ...formData, feed_id: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select feed</option>
              {feedInventory.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.quantity} {item.unit} available)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label htmlFor="fed_by" className="block text-sm font-medium text-gray-700">
              Fed By
            </label>
            <input
              type="text"
              id="fed_by"
              value={formData.fed_by}
              onChange={(e) => setFormData({ ...formData, fed_by: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeedingRecord;