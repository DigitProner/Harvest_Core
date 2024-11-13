import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

interface AddFeedingRecordProps {
  animalId: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddFeedingRecord: React.FC<AddFeedingRecordProps> = ({
  animalId,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    animalId,
    date: new Date().toISOString().split('T')[0],
    feedType: '',
    quantity: '',
    unit: 'kg',
    feeder: '',
    notes: ''
  });

  const [feedInventory, setFeedInventory] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    // Fetch feed inventory and staff list
    const fetchData = async () => {
      try {
        const [inventoryRes, staffRes] = await Promise.all([
          fetch('/api/inventory/feed'),
          fetch('/api/staff')
        ]);
        
        const inventory = await inventoryRes.json();
        const staffList = await staffRes.json();
        
        setFeedInventory(inventory);
        setStaff(staffList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add Feeding Record</h2>
            <p className="text-sm text-gray-500 mt-1">Record new feeding activity</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="feedType" className="block text-sm font-medium text-gray-700">
              Feed Type
            </label>
            <select
              id="feedType"
              value={formData.feedType}
              onChange={(e) => setFormData({ ...formData, feedType: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select feed type</option>
              {feedInventory.map((feed) => (
                <option key={feed.id} value={feed.id}>
                  {feed.name} ({feed.quantity} {feed.unit} available)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <select
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
                <option value="g">Grams (g)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="feeder" className="block text-sm font-medium text-gray-700">
              Fed By
            </label>
            <select
              id="feeder"
              value={formData.feeder}
              onChange={(e) => setFormData({ ...formData, feeder: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select staff member</option>
              {staff.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
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
              placeholder="Any additional notes..."
            />
          </div>

          <div className="flex justify-end gap-3">
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