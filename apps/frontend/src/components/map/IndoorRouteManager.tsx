import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMap } from '@/contexts/MapContext';
import type { FeatureCollection, Feature, LineString } from 'geojson';

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

// Layer IDs
const INDOOR_ROUTE_SOURCE = 'indoor-route-source';
const INDOOR_ROUTE_LAYER = 'indoor-route-layer';
const INDOOR_ROUTE_CASING_LAYER = 'indoor-route-casing-layer';
const MAP_LAYER_BEFORE_ID = 'road-label';

interface IndoorRouteManagerProps {
  pathNodes: pNodeZT[] | null | undefined;
  activeType: 'parking' | 'department' | null;
}

function convertNodesToGeoJSON(nodes: pNodeZT[]): FeatureCollection {
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

function createParkingMarkerElement(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'parking-marker';
  element.style.width = '32px';
  element.style.height = '32px';
  element.style.borderRadius = '50%';
  element.style.backgroundColor = '#00A86B';
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
  
  useEffect(() => {
    if (!map || map._removed) return;
    
    try {
      if (!map.getCanvas || !map.getStyle()) {
        return;
      }
      
      if (!initializedRef.current) {
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
          
          // Add casing layer for contrast
          map.addLayer({
            id: INDOOR_ROUTE_CASING_LAYER,
            type: 'line',
            source: INDOOR_ROUTE_SOURCE,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#FFFFFF',
              'line-width': 14,
              'line-opacity': 0.6
            }
          }, MAP_LAYER_BEFORE_ID);
          
          // Add main indoor route layer
          map.addLayer({
            id: INDOOR_ROUTE_LAYER,
            type: 'line',
            source: INDOOR_ROUTE_SOURCE,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#00A86B',
              'line-width': 10,
              'line-opacity': 0.9,
              'line-dasharray': [2, 2],
            }
          }, INDOOR_ROUTE_CASING_LAYER);
          
          initializedRef.current = true;
          console.log("Indoor route layers initialized");
        }
      }
      
      if (initializedRef.current) {
        const source = map.getSource(INDOOR_ROUTE_SOURCE) as mapboxgl.GeoJSONSource;
        
        if (parkingMarkerRef.current) {
          parkingMarkerRef.current.remove();
          parkingMarkerRef.current = null;
        }
        
        if (activeType === 'parking' && pathNodes && pathNodes.length >= 2) {
          const geojsonData = convertNodesToGeoJSON(pathNodes);
          source.setData(geojsonData);
          console.log("Indoor route data updated with", pathNodes.length, "nodes");
          
          // Add parking marker at the last node (parking location)
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
    
    return () => {
      if (!map || map._removed) return;
      
      try {
        if (parkingMarkerRef.current) {
          parkingMarkerRef.current.remove();
          parkingMarkerRef.current = null;
        }
        
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
  
  return null;
} 