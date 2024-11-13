import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

interface AddFeedInventoryProps {
  item?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddFeedInventory: React.FC<AddFeedInventoryProps> = ({
  item,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState(item || {
    name: '',
    type: '',
    quantity: '',
    unit: 'kg',
    reorderPoint: '',
    lastRestocked: new Date().toISOString().split('T')[0],
    expiryDate: '',
    supplier: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {item ? 'Edit Feed' : 'Add New Feed'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {item ? 'Update feed information' : 'Add a new feed to inventory'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Feed Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Feed Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select type</option>
              <option value="hay">Hay</option>
              <option value="grain">Grain</option>
              <option value="silage">Silage</option>
              <option value="concentrate">Concentrate</option>
              <option value="supplement">Supplement</option>
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
                <option value="tons">Tons</option>
                <option value="bales">Bales</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="reorderPoint" className="block text-sm font-medium text-gray-700">
              Reorder Point
            </label>
            <input
              type="number"
              id="reorderPoint"
              value={formData.reorderPoint}
              onChange={(e) => setFormData({ ...formData, reorderPoint: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label htmlFor="lastRestocked" className="block text-sm font-medium text-gray-700">
              Last Restocked
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="lastRestocked"
                value={formData.lastRestocked}
                onChange={(e) => setFormData({ ...formData, lastRestocked: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
              Supplier
            </label>
            <input
              type="text"
              id="supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
              {item ? 'Save Changes' : 'Add Feed'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeedInventory;