import React, { useState } from 'react';
import { X, Upload, Tag as TagIcon } from 'lucide-react';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const categories = [
  { label: 'Meat', types: ['Beef', 'Pork', 'Lamb', 'Poultry'] },
  { label: 'Dairy & Eggs', types: ['Milk', 'Cheese', 'Eggs', 'Butter'] },
  { label: 'Produce', types: ['Vegetables', 'Fruits', 'Herbs'] },
  { label: 'Grains', types: ['Wheat', 'Corn', 'Barley'] }
];

const ProductForm = ({ product, onClose, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: '',
    type: '',
    price: '',
    unit: '',
    quantity: '',
    image: '',
    description: '',
    status: 'in-stock',
    tags: []
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag: string) => tag !== tagToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {product ? 'Update product information' : 'Add a new product to your inventory'}
            </p>
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
                  Product Name
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
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    category: e.target.value,
                    type: '' 
                  })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.label} value={cat.label}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Select type</option>
                  {categories.find(cat => cat.label === formData.category)?.types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
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
                    <option value="">Select unit</option>
                    <option value="lb">Pound (lb)</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="oz">Ounce (oz)</option>
                    <option value="unit">Unit</option>
                    <option value="dozen">Dozen</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity in Stock
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                  min="0"
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
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
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
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type and press Enter to add tags"
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  placeholder="Product description..."
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
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;