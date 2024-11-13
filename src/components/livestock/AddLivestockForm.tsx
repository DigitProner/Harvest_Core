import React, { useState } from 'react';
import { X, Upload, Calendar, Tag } from 'lucide-react';

interface AddLivestockFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const breeds = {
  Cattle: ['Holstein', 'Angus', 'Hereford', 'Jersey', 'Simmental'],
  Sheep: ['Merino', 'Suffolk', 'Dorper', 'Romney', 'Texel'],
  Goats: ['Boer', 'Nubian', 'Alpine', 'Saanen', 'LaMancha'],
  Pigs: ['Yorkshire', 'Duroc', 'Hampshire', 'Berkshire', 'Landrace']
};

const AddLivestockForm = ({ onClose, onSubmit }: AddLivestockFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cattle',
    breed: '',
    birthDate: '',
    weight: '',
    gender: 'female',
    status: 'healthy',
    group: '',
    identificationNumber: '',
    notes: '',
    purchaseDate: '',
    purchasePrice: '',
    source: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add New Livestock</h2>
            <p className="text-sm text-gray-500 mt-1">Enter the details of the new animal</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Animal Name
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
                <label htmlFor="identificationNumber" className="block text-sm font-medium text-gray-700">
                  Identification Number
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="identificationNumber"
                    value={formData.identificationNumber}
                    onChange={(e) => setFormData({ ...formData, identificationNumber: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    category: e.target.value,
                    breed: '' // Reset breed when category changes
                  })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                >
                  {Object.keys(breeds).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
                  Breed
                </label>
                <select
                  id="breed"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Select breed</option>
                  {breeds[formData.category as keyof typeof breeds].map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Health Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="healthy">Healthy</option>
                  <option value="sick">Sick</option>
                  <option value="quarantine">In Quarantine</option>
                  <option value="treatment">Under Treatment</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                  Birth Date
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                  Assign to Group
                </label>
                <select
                  id="group"
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="">Select group</option>
                  <option value="dairy-a">Dairy Cattle A</option>
                  <option value="breeding">Breeding Stock</option>
                  <option value="wool">Wool Sheep</option>
                </select>
              </div>

              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                  Source/Origin
                </label>
                <input
                  type="text"
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  placeholder="e.g., Born on farm, Purchased from..."
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <Upload className="h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  placeholder="Any additional information..."
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
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
              Add Livestock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLivestockForm;