import mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from '@/lib/mapbox';
import { MAPBOX_SUPPORT_REASONS } from '@/lib/constants';

// Set the Mapbox access token globally for all map instances
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// Global map instance as a singleton
let globalMapInstance: mapboxgl.Map | null = null;

/**
 * Determines if the current browser environment supports Mapbox GL JS
 * @returns boolean indicating if Mapbox GL is supported
 */
export function isMapboxSupported(): boolean {
  return mapboxgl.supported();
}

/**
 * Provides detailed information about Mapbox GL support status
 * @returns Object containing support status and reason if not supported
 */
export function getMapboxSupportStatus(): { supported: boolean; reason?: string } {
  if (mapboxgl.supported()) {
    return { supported: true };
  }
  
  // Check for WebGL support in the browser
  if (!window.WebGLRenderingContext) {
    return { 
      supported: false, 
      reason: MAPBOX_SUPPORT_REASONS.NO_WEBGL
    };
  }
  
  // Verify WebGL context can be created
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!context) {
    return { 
      supported: false, 
      reason: MAPBOX_SUPPORT_REASONS.WEBGL_DISABLED
    };
  }
  
  return { 
    supported: false, 
    reason: MAPBOX_SUPPORT_REASONS.UNKNOWN
  };
}

/**
 * Gets the global map instance or creates one if it doesn't exist
 * @param container - HTML element that will contain the map
 * @param options - Optional configuration for the map instance
 * @returns The global Mapbox map instance
 */
export function initializeMap(
  container: HTMLElement,
  options: Partial<mapboxgl.MapOptions> = {}
): mapboxgl.Map | null {
  // If a global instance exists and is valid, move it to the new container
  if (globalMapInstance && !globalMapInstance._removed) {
    try {
      // Check if the map is already in this container
      const currentContainer = globalMapInstance.getContainer();
      if (currentContainer === container) {
        console.log("Map already using this container, returning existing instance");
        return globalMapInstance;
      }
      
      // Move the existing map to the new container
      console.log("Moving existing map to new container");
      globalMapInstance.getContainer().remove();
      container.appendChild(currentContainer);
      globalMapInstance.resize();
      return globalMapInstance;
    } catch (error) {
      console.warn("Error with existing map instance, will create new one:", error);
      cleanupMap();
    }
  }
  
  // If we don't have a valid map instance, create a new one
  if (!isMapboxSupported()) {
    console.error('Mapbox GL is not supported in this browser.');
    return null;
  }
  
  try {
    console.log("Creating new map instance");
    
    // Create base map configuration with sensible defaults
    const baseConfig: Partial<mapboxgl.MapOptions> = {
      container,
      style: options.style,
      center: options.center,
      zoom: options.zoom,
      preserveDrawingBuffer: true, // Needed for screenshots/exports
      attributionControl: false,  // We'll add our own if needed
      trackResize: true,          // Automatically resize on container changes
      antialias: true,            // Enable antialiasing for smoother rendering
    };

    // Configure scrollZoom behavior for cursor-centered zooming
    const scrollZoomConfig = {
      smooth: true,               // Enable smooth zooming
      speed: 0.75,                // Slightly slower zoom for more control
      around: 'cursor' as const,  // VERY IMPORTANT: zoom occurs at cursor position
      smoothTime: 100,            // Smooth animation duration in ms (lower = more responsive)
    };

    // Configure dragPan for better panning experience
    const dragPanConfig = {
      inertia: true,                // Enable inertia
      inertiaDeceleration: 2200,    // Lower value = more inertia
      maxSpeed: 1400,               // Limit max speed for better control
      easing: (t: number) => t,     // Linear easing function
    };

    // Create the map with our configuration
    const map = new mapboxgl.Map({
      ...baseConfig,
      scrollZoom: scrollZoomConfig,
      dragPan: dragPanConfig,
      ...options, // User options override our defaults
    });

    // Add custom behavior and event listeners
    map.once('load', () => {
      // The map has loaded - we can setup additional behaviors here
      console.log("Map fully loaded and ready for interactions");
      
      // Add cursor change on draggable elements
      map.getCanvas().style.cursor = 'grab';
      
      // Add event listeners for cursor styles
      map.on('mousedown', () => {
        map.getCanvas().style.cursor = 'grabbing';
      });
      
      map.on('mouseup', () => {
        map.getCanvas().style.cursor = 'grab';
      });
      
      map.on('dragend', () => {
        map.getCanvas().style.cursor = 'grab';
      });
    });
    
    // Add handler for WebGL context loss/restoration
    map.on('webglcontextlost', () => {
      console.warn('WebGL context lost. Attempting to restore...');
    });
    
    map.on('webglcontextrestored', () => {
      console.log('WebGL context restored successfully.');
    });
    
    // Add error handler
    map.on('error', (e) => {
      console.error('Mapbox GL error:', e.error);
    });
    
    // Store in global variable
    globalMapInstance = map;
    console.log("Mapbox map initialized successfully.");
    return map;
  } catch (error) {
    console.error('Error initializing Mapbox GL:', error);
    return null;
  }
}

/**
 * Clean up the global map instance
 */
export function cleanupMap(): void {
  if (globalMapInstance) {
    try {
      globalMapInstance.remove();
    } catch (e) {
      console.warn("Error removing map:", e);
    }
    globalMapInstance = null;
    console.log("Global map instance cleaned up");
  }
}

/**
 * Get the current global map instance without creating a new one
 */
export function getMapInstance(): mapboxgl.Map | null {
  return globalMapInstance;
} 