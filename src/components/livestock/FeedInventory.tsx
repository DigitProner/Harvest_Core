import React, { useState, useEffect } from 'react';
import { Package, Plus } from 'lucide-react';

interface FeedItem {
  id: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  last_updated: string;
}

const FeedInventory = () => {
  const [inventory, setInventory] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/feeding/inventory');
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setInventory(data);
    } catch (err) {
      setError('Failed to load feed inventory');
      console.error('Error fetching feed inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading inventory...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Feed Inventory</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Feed
          </button>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.type}</p>
                <div className="mt-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {item.quantity} {item.unit}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Last updated: {new Date(item.last_updated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedInventory;