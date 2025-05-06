"use client";

import React, { useEffect, useRef, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMap } from '@/contexts/MapContext';
import type { Hospital } from '@/types/hospital';
import { cn } from '@/lib/utils';
import { icons } from '@/lib/icons'; // Import centralized map
import { Hospital as HospitalIcon, Info } from 'lucide-react'; // Keep fallback import, add Info icon
import { calculateBearing } from '@/lib/utils';
import { toast } from 'sonner'; // Import toast
// Import constants
import {
  DEFAULT_FLY_TO_OPTIONS,
  HOSPITAL_SPECIFIC_VIEWS
} from '@/lib/constants'; 
// Add CameraOptions import
import type { CameraOptions } from 'mapbox-gl';

// Define the combined type for flyTo options
type CustomFlyToOptions = Omit<mapboxgl.CameraOptions & mapboxgl.AnimationOptions, 'center'>;

interface LocationMarkerProps {
  hospital: Hospital;
  iconName: string; // Use iconName instead of index
}

export function LocationMarker({ hospital, iconName }: LocationMarkerProps) {
  const { 
    map, 
    selectedLocation, setSelectedLocation, 
    popupLocation, setPopupLocation, 
    userLocation, // Get userLocation from context
    flyTo,
    activeTab // Get activeTab from context
  } = useMap();
  
  // Ref for the Mapbox marker instance
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // Find the icon component based on name, default to HospitalIcon
  const IconComponent = useMemo(() => icons[iconName] || HospitalIcon, [iconName]);

  const isSelected = selectedLocation?.id === hospital.id;

  // --- Logic for clicking the marker element (remains largely the same) ---
  const handleListTabClick = (clickedHospital: Hospital) => {
      setSelectedLocation(clickedHospital);
      const isPopupCurrentlyOpen = popupLocation?.id === clickedHospital.id;
      if (isPopupCurrentlyOpen) {
          setPopupLocation(null);
      } else {
          setPopupLocation(clickedHospital);
          if (selectedLocation?.id !== clickedHospital.id) {
            if (clickedHospital.coordinates) {
              const specificView = HOSPITAL_SPECIFIC_VIEWS[clickedHospital.id] || {};
              const targetCenter = specificView.coordinates || clickedHospital.coordinates;
              let flyToOptions: CustomFlyToOptions & Pick<CameraOptions, 'zoom' | 'pitch' | 'bearing'> = {
                speed: DEFAULT_FLY_TO_OPTIONS.speed,
                curve: DEFAULT_FLY_TO_OPTIONS.curve,
                zoom: specificView.zoom ?? DEFAULT_FLY_TO_OPTIONS.zoom,
                pitch: specificView.pitch ?? DEFAULT_FLY_TO_OPTIONS.pitch,
                bearing: specificView.bearing ?? map?.getBearing() ?? 0,
              };
              if (specificView.bearing === undefined && userLocation) {
                try { flyToOptions.bearing = calculateBearing(userLocation, targetCenter as [number, number]); } catch (error) { console.error("Error bearing:", error); }
              }
              flyTo(targetCenter as [number, number], flyToOptions.zoom, flyToOptions, clickedHospital.id);
            }
          }
      }
  };

  const handleDirectionsTabClick = (clickedHospital: Hospital) => {
      const isCurrentlySelected = selectedLocation?.id === clickedHospital.id;
      const isPopupCurrentlyOpen = popupLocation?.id === clickedHospital.id;
      if (isCurrentlySelected) {
          if (isPopupCurrentlyOpen) { setPopupLocation(null); } else { setPopupLocation(clickedHospital); }
      } else {
          setSelectedLocation(clickedHospital);
          setPopupLocation(null);
          toast.info(`Calculating directions to ${clickedHospital.name}`, { icon: <Info className="h-4 w-4" /> });
      }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => { // Change type to React.MouseEvent
    e.stopPropagation();
    if (activeTab === 'directions') {
        handleDirectionsTabClick(hospital);
    } else {
        handleListTabClick(hospital);
    }
  };

  // Effect for creating/updating the Mapbox marker instance
  useEffect(() => {
    // Guard clause with more specific checks
    if (!map || !hospital.coordinates) return;

    // Use a simpler approach to marker creation with fewer delays
    try {
      // --- Create or update Mapbox Marker --- 
      if (!markerRef.current) {
        // First check if the map is still valid
        if (!map || map._removed) {
          return;
        }
        
        // --- Create the DOM element programmatically --- 
        const el = document.createElement('div');
        el.className = cn(
          'marker-dom-element cursor-pointer relative transition-transform duration-150 ease-in-out',
          isSelected && 'animate-marker-jump'
        );
        el.style.pointerEvents = 'auto';
        el.innerHTML = `
          <div class="${cn(
            `relative h-8 w-8 rounded-full flex items-center justify-center shadow-lg ring-2 ring-offset-2 ring-offset-background transition-all`,
             isSelected 
                ? 'bg-primary text-primary-foreground ring-primary ring-offset-primary/30 marker-icon-container-glow' 
                : 'bg-primary text-primary-foreground ring-primary ring-offset-primary/30'
          )}">
             <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="lucide lucide-${iconName}" // Dynamically add icon class if needed, or use fixed placeholder
             >
               <!-- Placeholder for IconComponent SVG content - Requires getting SVG string or using innerHTML dangerously -->
               <!-- Example: Direct SVG path for HospitalIcon as fallback -->
               <path d="M12 6v4"/> 
               <path d="M14 14h-4"/>
               <path d="M14 18h-4"/>
               <path d="M14 8h-4"/>
               <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/>
               <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/>
             </svg>
          </div>
          <div class="${cn(
            `tip-element absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0`,
            `border-l-[6px] border-l-transparent border-t-[9px] border-r-[6px] border-r-transparent transition-colors z-10`,
             isSelected ? 'border-t-primary' : 'border-t-primary'
          )}"></div>
        `;
        // Attach click listener directly to the DOM element
        el.addEventListener('click', (domEvent) => {
           domEvent.stopPropagation(); // Prevent map click
           if (activeTab === 'directions') {
               handleDirectionsTabClick(hospital);
           } else {
               handleListTabClick(hospital);
           }
        });
        // --- End element creation ---

        // Create the marker
        markerRef.current = new mapboxgl.Marker({
          element: el, // Use the programmatically created element
          anchor: 'bottom',
        });
        
        // Set position first
        markerRef.current.setLngLat(hospital.coordinates as [number, number]);
        
        // Add to map with validation
        if (map.getContainer()) {
          try {
            markerRef.current.addTo(map);
          } catch (err) {
            console.warn("Could not add marker to map, will try again later");
          }
        }
      } else {
        // Just update position if marker already exists
        markerRef.current.setLngLat(hospital.coordinates as [number, number]);
      }
    } catch (error) {
      console.error("Error creating/updating marker:", error);
      // Clean up on error
      if (markerRef.current) {
        try { markerRef.current.remove(); } catch (e) { }
        markerRef.current = null;
      }
    }

    // Cleanup function to remove the Mapbox marker
    return () => {
      if (markerRef.current) {
        try {
          markerRef.current.remove();
        } catch (error) {
          console.error("Error removing marker:", error);
        }
        markerRef.current = null;
      }
    };
  // Dependencies: map instance and coordinates
  }, [map, hospital.coordinates, isSelected, activeTab]); // Add isSelected and activeTab dependency for correct styling/click behavior

  // This component no longer renders anything in React tree
  return null;
} 