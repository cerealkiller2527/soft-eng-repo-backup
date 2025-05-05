import { useState, useEffect } from 'react';
import type { Hospital } from '@/types/hospital';
import { baseHospitalData } from '@/lib/constants';

interface HospitalDataState {
  hospitals: Hospital[];
  loading: boolean;
  error: string | null;
}

export function useHospitalData(): HospitalDataState {
  // Remove dynamic state fetching logic - These lines were causing the syntax error and should be removed
  // const [state, setState] = useState<HospitalDataState>(...);
  // useEffect(() => { ... });

  // Directly return the hardcoded data structure
  // Ensure baseHospitalData in constants.ts matches the Hospital type structure,
  const enrichedBaseData = baseHospitalData.map(h => ({
    // hardcoded data fix - i hate this, but it's a quick fix for now
      ...h,
      id: h.id, 
      name: h.name, 
      coordinates: h.coordinates ?? undefined,
      address: h.address ?? "Address unavailable",
      phone: h.phone ?? "Phone unavailable",
      isOpen: h.isOpen ?? undefined,
      website: h.website ?? undefined,
      placeId: h.placeId ?? undefined,
  }));

  return {
      hospitals: enrichedBaseData as Hospital[],
      loading: false,
      error: null,
  };
}