import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMap } from '@/contexts/MapContext';
import type { FeatureCollection, Feature, LineString } from 'geojson';

// Define the node type from backend
interface pNodeZT {
  id: number;
  description: string;
  longitude: number;
  latitude: number;
  floor: number;
  outside: boolean;
  type: string;
  neighbors: number[];
}

// Constants for layer IDs
const INDOOR_ROUTE_SOURCE = 'indoor-route-source';
const INDOOR_ROUTE_LAYER = 'indoor-route-layer';
const INDOOR_ROUTE_CASING_LAYER = 'indoor-route-casing-layer';
const MAP_LAYER_BEFORE_ID = 'road-label'; // Same as RouteLayerManager

interface IndoorRouteManagerProps {
  pathNodes: pNodeZT[] | null | undefined;
  activeType: 'parking' | 'department' | null;
}

// Convert node array to GeoJSON format
function convertNodesToGeoJSON(nodes: pNodeZT[]): FeatureCollection {
  // Extract coordinates from nodes
  const coordinates = nodes.map(node => [node.longitude, node.latitude]);
  
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {
        isIndoor: true
      },
      geometry: {
        type: 'LineString',
        coordinates
      } as LineString
    }]
  };
}

// Create parking marker HTML element
function createParkingMarkerElement(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'parking-marker';
  element.style.width = '32px';
  element.style.height = '32px';
  element.style.borderRadius = '50%';
  element.style.backgroundColor = '#00A86B'; // Same green color as the route
  element.style.color = 'white';
  element.style.fontWeight = 'bold';
  element.style.display = 'flex';
  element.style.alignItems = 'center';
  element.style.justifyContent = 'center';
  element.style.border = '2px solid white';
  element.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
  element.style.fontSize = '16px';
  element.innerHTML = 'P';
  return element;
}

export function IndoorRouteManager({ pathNodes, activeType }: IndoorRouteManagerProps) {
  const { map } = useMap();
  const initializedRef = useRef(false);
  const layerIds = [INDOOR_ROUTE_CASING_LAYER, INDOOR_ROUTE_LAYER];
  const parkingMarkerRef = useRef<mapboxgl.Marker | null>(null);
  
  // Effect to add/update indoor route layer
  useEffect(() => {
    if (!map || map._removed) return;
    
    try {
      // Skip if map is not ready
      if (!map.getCanvas || !map.getStyle()) {
        return;
      }
      
      // Create new source and layers if not initialized
      if (!initializedRef.current) {
        // Check if source already exists
        let sourceExists = false;
        try {
          sourceExists = !!map.getSource(INDOOR_ROUTE_SOURCE);
        } catch (error) {
          console.warn(`Error checking if indoor source exists:`, error);
        }
        
        if (!sourceExists) {
          // Add empty GeoJSON source
          map.addSource(INDOOR_ROUTE_SOURCE, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          });
          
          // Add casing layer (wider line behind main line for contrast)
          map.addLayer({
            id: INDOOR_ROUTE_CASING_LAYER,
            type: 'line',
            source: INDOOR_ROUTE_SOURCE,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#FFFFFF', // White casing
              'line-width': 14, // Wider than the main line for outline effect
              'line-opacity': 0.6
            }
          }, MAP_LAYER_BEFORE_ID);
          
          // Add main indoor route layer with dashed line and animation
          map.addLayer({
            id: INDOOR_ROUTE_LAYER,
            type: 'line',
            source: INDOOR_ROUTE_SOURCE,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#00A86B', // Forest green color for indoor route
              'line-width': 10, // Match the width of the outdoor route
              'line-opacity': 0.9, // Match the opacity of the outdoor route
              'line-dasharray': [2, 2],
            }
          }, INDOOR_ROUTE_CASING_LAYER); // Place above the casing
          
          initializedRef.current = true;
          console.log("Indoor route layers initialized");
        }
      }
      
      // Update source data and parking marker if path nodes are available
      if (initializedRef.current) {
        // Get the source
        const source = map.getSource(INDOOR_ROUTE_SOURCE) as mapboxgl.GeoJSONSource;
        
        // Remove existing parking marker if any
        if (parkingMarkerRef.current) {
          parkingMarkerRef.current.remove();
          parkingMarkerRef.current = null;
        }
        
        // Only show if activeType is 'parking' and nodes exist
        if (activeType === 'parking' && pathNodes && pathNodes.length >= 2) {
          // Convert nodes to GeoJSON and update source
          const geojsonData = convertNodesToGeoJSON(pathNodes);
          source.setData(geojsonData);
          console.log("Indoor route data updated with", pathNodes.length, "nodes");
          
          // Add parking marker at the last node (which is the parking location)
          // instead of the first node
          const parkingNode = pathNodes[pathNodes.length - 1];  
          if (parkingNode && parkingNode.longitude && parkingNode.latitude) {
            const markerElement = createParkingMarkerElement();
            parkingMarkerRef.current = new mapboxgl.Marker({
              element: markerElement,
              anchor: 'center'
            })
              .setLngLat([parkingNode.longitude, parkingNode.latitude])
              .addTo(map);
            console.log("Added parking marker at", [parkingNode.longitude, parkingNode.latitude]);
          }
        } else {
          // Clear the source if no valid path
          source.setData({
            type: 'FeatureCollection',
            features: []
          });
          console.log("Indoor route cleared - no valid path nodes");
        }
      }
    } catch (error) {
      console.error("Error managing indoor route layer:", error);
    }
    
    // Cleanup function to remove layers and source
    return () => {
      if (!map || map._removed) return;
      
      try {
        // Remove parking marker if exists
        if (parkingMarkerRef.current) {
          parkingMarkerRef.current.remove();
          parkingMarkerRef.current = null;
        }
        
        // Remove layers and source
        if (map.getStyle()) {
          layerIds.forEach(id => {
            if (map.getLayer(id)) {
              map.removeLayer(id);
            }
          });
          
          if (map.getSource(INDOOR_ROUTE_SOURCE)) {
            map.removeSource(INDOOR_ROUTE_SOURCE);
          }
          
          initializedRef.current = false;
          console.log("Indoor route layers cleaned up");
        }
      } catch (error) {
        console.warn("Error cleaning up indoor route layers:", error);
      }
    };
  }, [map, pathNodes, activeType]);
  
  return null; // Non-rendering component
} 