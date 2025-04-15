// src/routes/mapInfoTest.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';

const MapInfoTest: React.FC = () => {
  console.log("MapInfoTest component rendering");
  const trpc = useTRPC();
  
  // Use the queryOptions pattern that matches your existing code
  const buildingsQuery = useQuery(
    trpc.mapInfo.getBuildings.queryOptions()
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Map Information Test Page</h1>
      
      {buildingsQuery.isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {buildingsQuery.error?.message || "Failed to fetch buildings"}
        </div>
      )}
      
      {buildingsQuery.isLoading ? (
        <div className="text-center py-4">Loading buildings...</div>
      ) : (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Buildings</h2>
          {!buildingsQuery.data || buildingsQuery.data.length === 0 ? (
            <p>No buildings found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {buildingsQuery.data.map(building => (
                <div 
                  key={building.id}
                  className="p-4 border rounded hover:bg-gray-50"
                >
                  <h3 className="font-medium">{building.name}</h3>
                  <p className="text-sm text-gray-600">{building.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8 bg-gray-100 p-4 rounded">
        <h3 className="text-lg font-medium mb-2">Debug Info</h3>
        <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40">
          Query Status: {buildingsQuery.status}
          {"\n"}
          isLoading: {String(buildingsQuery.isLoading)}
          {"\n"}
          isError: {String(buildingsQuery.isError)}
          {"\n"}
          Data: {JSON.stringify(buildingsQuery.data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default MapInfoTest;