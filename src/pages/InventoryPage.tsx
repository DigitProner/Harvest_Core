import React, { useState } from 'react';
import { Package, Plus, Search, Filter, ArrowUpDown, Tag, Trash2, Edit2 } from 'lucide-react';
import ProductForm from '../components/inventory/ProductForm';
import FilterMenu from '../components/inventory/FilterMenu';
import SortMenu from '../components/inventory/SortMenu';

interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  description: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  tags: string[];
}

const products: Product[] = [
  {
    id: 'P001',
    name: 'Premium Ground Beef',
    category: 'Meat',
    type: 'Beef',
    price: 8.99,
    unit: 'lb',
    quantity: 150,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=100&h=100',
    description: 'Fresh ground beef from grass-fed cattle',
    status: 'in-stock',
    tags: ['Organic', 'Grass-fed']
  },
  {
    id: 'P002',
    name: 'Farm Fresh Eggs',
    category: 'Dairy & Eggs',
    type: 'Eggs',
    price: 5.99,
    unit: 'dozen',
    quantity: 80,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=100&h=100',
    description: 'Free-range chicken eggs',
    status: 'low-stock',
    tags: ['Free-range', 'Organic']
  },
  {
    id: 'P003',
    name: 'Organic Tomatoes',
    category: 'Produce',
    type: 'Vegetables',
    price: 3.99,
    unit: 'lb',
    quantity: 200,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&h=100',
    description: 'Locally grown organic tomatoes',
    status: 'in-stock',
    tags: ['Organic', 'Local']
  }
];

const InventoryPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({
    field: 'name',
    direction: 'asc'
  });

  const handleAddProduct = (data: any) => {
    console.log('Adding product:', data);
    setShowAddProduct(false);
  };

  const handleEditProduct = (data: any) => {
    console.log('Updating product:', data);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    console.log('Deleting product:', productId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 mt-1">Manage your farm products and inventory</p>
        </div>
        <button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">432</p>
            </div>
          </div>
        </div>
        {/* Add more stats cards as needed */}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 text-gray-500" />
            Filters
          </button>
          <FilterMenu
            isOpen={showFilterMenu}
            onClose={() => setShowFilterMenu(false)}
            filters={filters}
            onFilterChange={(sectionId, value) => {
              setFilters(prev => ({
                ...prev,
                [sectionId]: prev[sectionId]?.includes(value)
                  ? prev[sectionId].filter(v => v !== value)
                  : [...(prev[sectionId] || []), value]
              }));
            }}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <ArrowUpDown className="h-5 w-5 text-gray-500" />
            Sort
          </button>
          <SortMenu
            isOpen={showSortMenu}
            onClose={() => setShowSortMenu(false)}
            currentSort={sort}
            onSortChange={(field) => {
              setSort(prev => ({
                field,
                direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
              }));
            }}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                  <div className="text-sm text-gray-500">{product.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">per {product.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.quantity} {product.unit}s
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddProduct && (
        <ProductForm onClose={() => setShowAddProduct(false)} onSubmit={handleAddProduct} />
      )}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSubmit={handleEditProduct}
        />
      )}
    </div>
  );
};

export default InventoryPage;