import React from 'react';
import PropertyCard from './PropertyCard';

function PropertyGrid({ properties, loading }) {
  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="h-48 bg-gray-200 skeleton" />
            <div className="p-5">
              <div className="h-6 bg-gray-200 skeleton rounded mb-3" />
              <div className="h-4 bg-gray-200 skeleton rounded mb-2" />
              <div className="h-4 bg-gray-200 skeleton rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default PropertyGrid;
