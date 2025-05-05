import { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { initializeMap, getMapInstance } from '@/lib/services/mapbox-service';
import { MAP_STYLE, DEFAULT_MAP_VIEW } from '@/lib/mapbox';

interface UseMapInitializationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  options?: Partial<mapboxgl.MapOptions>;
  onZoom?: (zoom: number) => void; // Callback for zoom changes
  onLoad?: (map: mapboxgl.Map) => void; // Callback when map is loaded
  logCameraParams?: boolean; // Optional flag to log camera params on move end
}

export function useMapInitialization({
  containerRef,
  options = {},
  onZoom,
  onLoad,
  logCameraParams = false, // Default to false
}: UseMapInitializationProps): mapboxgl.Map | null {
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const handlersAttachedRef = useRef(false); // Track if handlers are attached
  
  // --- Define Stable Listener Functions --- 
  const handleMapLoad = useCallback(() => {
    const map = getMapInstance();
    if (!map) return;
    console.log("Map loaded via hook.");
    
    // Only call onLoad if the map instance is still valid
    if (!map._removed) {
      setMapInstance(map);
      onLoad?.(map);
    }
  }, [onLoad]); // Dependency: onLoad callback

  const handleMapZoom = useCallback(() => {
    const map = getMapInstance();
    if (!map || map._removed) return;
    onZoom?.(map.getZoom());
  }, [onZoom]); // Dependency: onZoom callback

  const handleMoveEndLog = useCallback(() => {
    const map = getMapInstance();
    if (!map || !logCameraParams || map._removed) return;
    const center = map.getCenter();
    const zoom = map.getZoom();
    const pitch = map.getPitch();
    const bearing = map.getBearing();
    console.log('Map Camera Params:',
      `\n  Center: [${center.lng.toFixed(6)}, ${center.lat.toFixed(6)}]`,
      `\n  Zoom: ${zoom.toFixed(2)}`,
      `\n  Pitch: ${pitch.toFixed(2)}`,
      `\n  Bearing: ${bearing.toFixed(2)}`
    );
  }, [logCameraParams]); // Dependency: logCameraParams flag

  // Function to attach event handlers
  const attachHandlers = useCallback((map: mapboxgl.Map) => {
    if (!map || handlersAttachedRef.current) return;
    
    // Attach event listeners
    map.on('load', handleMapLoad);
    map.on('zoom', handleMapZoom);
    if (logCameraParams) {
      map.on('moveend', handleMoveEndLog);
    }
    
    // Add debug click handler for development
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') {
      map.on('click', (e) => {
        console.log(`Clicked: [${e.lngLat.lng}, ${e.lngLat.lat}]`);
      });
    }
    
    handlersAttachedRef.current = true;
    console.log("Map handlers attached");
  }, [handleMapLoad, handleMapZoom, handleMoveEndLog, logCameraParams]);

  // Function to clean up event handlers (without removing the map)
  const detachHandlers = useCallback((map: mapboxgl.Map) => {
    if (!map || !handlersAttachedRef.current) return;
    
    try {
      // Remove event listeners
      map.off('load', handleMapLoad);
      map.off('zoom', handleMapZoom);
      if (logCameraParams) {
        map.off('moveend', handleMoveEndLog);
      }
      
      handlersAttachedRef.current = false;
      console.log("Map handlers detached");
    } catch (e) {
      console.warn("Error detaching map handlers:", e);
    }
  }, [handleMapLoad, handleMapZoom, handleMoveEndLog, logCameraParams]);

  // Effect for initializing the map or reusing existing
  useEffect(() => {
    // Skip if container ref is invalid
    if (!containerRef.current) return;
    
    // Check if we already have a map (singleton pattern)
    let map = getMapInstance();
    
    if (!map) {
      console.log("No existing map found, initializing new map");
      // Initialize the map with our config
      map = initializeMap(containerRef.current, {
        style: MAP_STYLE,
        center: DEFAULT_MAP_VIEW.center as [number, number],
        zoom: DEFAULT_MAP_VIEW.zoom,
        minZoom: DEFAULT_MAP_VIEW.minZoom,
        maxZoom: DEFAULT_MAP_VIEW.maxZoom,
        pitch: DEFAULT_MAP_VIEW.pitch,
        bearing: DEFAULT_MAP_VIEW.bearing,
        renderWorldCopies: false,
        ...options, // Allow overriding defaults
      });
    } else {
      console.log("Using existing map instance");
    }
    
    // If we have a valid map, attach handlers and update state
    if (map && !map._removed) {
      attachHandlers(map);
      setMapInstance(map);
      
      // If map is already loaded, call onLoad directly
      if (map.loaded()) {
        console.log("Map already loaded, calling onLoad directly");
        onLoad?.(map);
      }
    }

    // Cleanup function - only detach handlers, don't remove map
    return () => {
      const currentMap = getMapInstance();
      if (currentMap) {
        detachHandlers(currentMap);
      }
    };
  }, [
    containerRef,
    options.style, // Only major option changes should cause reinitialization
    options.projection,
    attachHandlers,
    detachHandlers,
    onLoad
  ]); 

  return mapInstance; // Return the map instance state
} 