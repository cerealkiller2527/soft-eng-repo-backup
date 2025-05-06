// src/components/MainMap.tsx
import React, { useRef, useCallback, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMap } from '@/contexts/MapContext';
import { useMapInitialization } from "@/lib/hooks/useMapInitialization";
import {
  SKY_LAYER_CONFIG,
  BUILDINGS_LAYER_CONFIG,
  Z_INDEX
} from "@/lib/constants";

export function MainMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const { map: contextMap, setMap, setZoom } = useMap()

  const handleMapLoad = useCallback((loadedMap: mapboxgl.Map) => {
    loadedMap.addLayer(SKY_LAYER_CONFIG);
    console.log("Sky layer added.");

    setMap(loadedMap);
    
    // Force resize after map loads to ensure correct dimensions
    // setTimeout(() => {
    //   loadedMap.resize();
    // }, 100); - might be causing issues with the map not loading
  }, [setMap]);

  const handleMapZoom = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, [setZoom]);

  // Use the initialization hook
  useMapInitialization({
    containerRef: mapContainerRef,
    onLoad: handleMapLoad,
    onZoom: handleMapZoom,
    logCameraParams: true
  });

  // Resize map when context map instance changes (initial load)
  // useEffect(() => {
  //   contextMap?.resize()
  // }, [contextMap])

  return (
    <div 
      ref={mapContainerRef} 
      className="absolute inset-0 w-full h-full" 
      style={{ zIndex: Z_INDEX.map }} 
      data-testid="main-map-container" 
    />
  )
} 