import React, { useState } from 'react';
import { X, Package, User, Calendar, Clock, FileText } from 'lucide-react';

interface FeedingFormProps {
  animalId: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const FeedingForm: React.FC<FeedingFormProps> = ({ animalId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    feedType: '',
    amount: '',
    unit: 'kg',
    notes: '',
    timestamp: new Date().toISOString().slice(0, 16) // Format: YYYY-MM-DDThh:mm
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      animalId
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Record Feeding</h2>
            <p className="text-sm text-gray-500 mt-1">Add new feeding record</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="feedType" className="block text-sm font-medium text-gray-700">
              Feed Type
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="feedType"
                value={formData.feedType}
                onChange={(e) => setFormData({ ...formData, feedType: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select feed type</option>
                <option value="Hay">Hay</option>
                <option value="Grain">Grain</option>
                <option value="Silage">Silage</option>
                <option value="Concentrate">Concentrate</option>
                <option value="Pasture">Pasture</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
                <option value="g">Grams (g)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">
              Date & Time
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="datetime-local"
                id="timestamp"
                value={formData.timestamp}
                onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional notes..."
              />
            </div>
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
              Record Feeding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedingForm;