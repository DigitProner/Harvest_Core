import React from 'react';
import FeedingRecords from '../components/feeding/FeedingRecords';

const FeedingPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feeding Management</h1>
        <p className="text-gray-500 mt-1">Track and manage livestock feeding records</p>
      </div>
      
      <FeedingRecords />
    </div>
  );
};

export default FeedingPage;