// src/routes/mapInfoTest.tsx
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '../database/trpc.ts';

const MapInfoTest: React.FC = () => {
  const trpc = useTRPC();
  
  // Test 1: Get all buildings
  const buildingsQuery = useQuery(
    trpc.mapInfo.getBuildings.queryOptions()
  );

  // Test 2: Get building info for ID 27
  const buildingInfoQuery = useQuery(
    trpc.mapInfo.getBuildingInfo.queryOptions({ id: 27 })
  );

  // Test 3: Get building floors for ID 27
  const buildingFloorsQuery = useQuery(
    trpc.mapInfo.getBuildingFloors.queryOptions({ buildingId: 27 })
  );

  // Test 4: Get departments for building ID 27
  const departmentsQuery = useQuery(
    trpc.mapInfo.getBuildingDepartments.queryOptions({ buildingId: 27 })
  );

  useEffect(() => {
    console.group('MapInfo Router Test Results:');
    console.log('Buildings:', buildingsQuery.data);
    console.log('Building Info:', buildingInfoQuery.data);
    console.log('Building Floors:', buildingFloorsQuery.data);
    console.log('Departments:', departmentsQuery.data);
    console.groupEnd();
  }, [
    buildingsQuery.data,
    buildingInfoQuery.data,
    buildingFloorsQuery.data,
    departmentsQuery.data
  ]);

  // Return an empty div since we don't need UI
  return <div id="mapinfo-test" />;
};

export default MapInfoTest;