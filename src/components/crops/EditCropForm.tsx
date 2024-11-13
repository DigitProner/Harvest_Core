import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

interface EditCropFormProps {
  crop: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const EditCropForm: React.FC<EditCropFormProps> = ({ crop, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    ...crop,
    plantingDate: crop.plantingDate.split('T')[0], // Format date for input
    expectedHarvest: crop.expectedHarvest.split('T')[0] // Format date for input
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Edit Crop</h2>
            <p className="text-sm text-gray-500 mt-1">Update crop information</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Crop Name
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
              <label htmlFor="variety" className="block text-sm font-medium text-gray-700">
                Variety
              </label>
              <input
                type="text"
                id="variety"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label htmlFor="field" className="block text-sm font-medium text-gray-700">
                Field Location
              </label>
              <input
                type="text"
                id="field"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                Area
              </label>
              <input
                type="text"
                id="area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="planned">Planned</option>
                <option value="growing">Growing</option>
                <option value="harvested">Harvested</option>
              </select>
            </div>

            <div>
              <label htmlFor="health" className="block text-sm font-medium text-gray-700">
                Health Status
              </label>
              <select
                id="health"
                value={formData.health}
                onChange={(e) => setFormData({ ...formData, health: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700">
                Planting Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="plantingDate"
                  value={formData.plantingDate}
                  onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="expectedHarvest" className="block text-sm font-medium text-gray-700">
                Expected Harvest Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="expectedHarvest"
                  value={formData.expectedHarvest}
                  onChange={(e) => setFormData({ ...formData, expectedHarvest: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Additional notes or instructions..."
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCropForm;