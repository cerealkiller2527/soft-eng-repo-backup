"use client";

import { useEffect, useRef } from 'react';
import type mapboxgl from 'mapbox-gl';
import { useMap } from '@/contexts/MapContext';
import { createCustomLayer } from '@/lib/map/3d/createCustomLayer';
import type { BuildingAttributes } from '@/lib/map/3d/types';
// Assuming pNodeZT is the correct type for indoor path nodes from the backend
import type { pNodeZT } from '../../../../../packages/common/src/ZodSchemas'; 
// Assume BuildingAttributes data is stored in constants, keyed by hospital ID
import { MAP_LAYER_IDS, MAP_LAYER_BEFORE_ID, HOSPITAL_BUILDING_ATTRIBUTES, CUSTOM_BUILDING_ZOOM_THRESHOLD } from '@/lib/constants';

// Define the CustomLayerInterface if not globally available from @types/mapbox-gl
// This might be redundant if types are correctly installed and recognized.
interface CustomLayerInterface {
    id: string;
    type: 'custom';
    renderingMode?: '2d' | '3d';
    onAdd?(map: mapboxgl.Map, gl: WebGLRenderingContext): void;
    onRemove?(map: mapboxgl.Map, gl: WebGLRenderingContext): void;
    render(gl: WebGLRenderingContext, matrix: number[]): void;
    // ... other optional methods
}

// Define props for the component
interface Custom3DLayerManagerProps {
    indoorPathNodes: pNodeZT[] | null | undefined;
}

export function Custom3DLayerManager({ indoorPathNodes }: Custom3DLayerManagerProps) {
    const { map, zoom, selectedLocation } = useMap();
    // Keep track of the ID currently added to the map
    const activeLayerIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (!map || map._removed) return;

        const defaultBuildingsLayerId = MAP_LAYER_IDS.BUILDINGS;
        const zoomThreshold = CUSTOM_BUILDING_ZOOM_THRESHOLD;
        const targetHospitalId = selectedLocation?.id;
        let targetAttributes: BuildingAttributes | undefined = undefined;
        let targetLayerId: string | null = null;

        // Determine the target layer based on selection
        if (targetHospitalId !== undefined && HOSPITAL_BUILDING_ATTRIBUTES?.[targetHospitalId]) {
            targetAttributes = HOSPITAL_BUILDING_ATTRIBUTES[targetHospitalId];
            targetLayerId = `custom-3d-${targetHospitalId}`; 
        }

        console.log(`Simple Update - Zoom: ${zoom.toFixed(2)}, Threshold: ${zoomThreshold}, Target ID: ${targetLayerId}, Active ID: ${activeLayerIdRef.current}`);

        try {
            // Ensure default layer exists
            const defaultLayer = map.getLayer(defaultBuildingsLayerId);
            if (!defaultLayer) {
                 console.warn(`Default building layer '${defaultBuildingsLayerId}' not found.`);
                 // If default layer is missing, we probably can't proceed reliably
                 return; 
            }

            // --- Logic based on Zoom --- 
            if (zoom <= zoomThreshold) {
                // ZOMMED OUT: Show default, remove custom
                
                // Ensure default is visible
                 if (map.getLayoutProperty(defaultBuildingsLayerId, 'visibility') !== 'visible') {
                    map.setLayoutProperty(defaultBuildingsLayerId, 'visibility', 'visible');
                    console.log("Simplified: Showing default buildings.");
                 }

                // Remove active custom layer if it exists
                if (activeLayerIdRef.current && map.getLayer(activeLayerIdRef.current)) {
                    console.log(`Simplified Zoom Out: Removing layer ${activeLayerIdRef.current}`);
                    map.removeLayer(activeLayerIdRef.current);
                }
                activeLayerIdRef.current = null; // Clear active ref

            } else {
                // ZOMMED IN: Hide default, manage custom

                // Ensure default is hidden
                if (map.getLayoutProperty(defaultBuildingsLayerId, 'visibility') !== 'none') {
                    map.setLayoutProperty(defaultBuildingsLayerId, 'visibility', 'none');
                    console.log("Simplified: Hiding default buildings.");
                }

                // Logic for adding/updating the custom layer
                if (targetLayerId && targetAttributes) {
                    // If the target is the currently active layer, check if nodes are present now
                    if (activeLayerIdRef.current === targetLayerId) {
                        // If nodes just became available OR if the layer doesn't exist for some reason
                        if (indoorPathNodes && indoorPathNodes.length > 0 /* && !map.getLayer(targetLayerId) - Rely on explicit removal */) {
                            console.log(`Simplified Updating/Re-adding layer ${targetLayerId} because nodes are now available.`);
                             // Explicitly remove the layer first before adding the updated one
                             if (map.getLayer(targetLayerId)) { 
                                console.log(`   Attempting removal of existing ${targetLayerId}...`)
                                map.removeLayer(targetLayerId); 
                             }
                            // Add layer with nodes
                            console.log(`[Custom3DLayerManager] Calling createCustomLayer (update). Nodes: ${indoorPathNodes?.length ?? 0}`);
                            const newLayer = createCustomLayer(map, targetAttributes, indoorPathNodes);
                            if (!map.getLayer(newLayer.id)) { 
                                 map.addLayer(newLayer, MAP_LAYER_BEFORE_ID);
                            } else { console.warn(`Simplified: Layer ${newLayer.id} existed just before addLayer (update).`); }
                        } else if ((!indoorPathNodes || indoorPathNodes.length === 0) && map.getLayer(targetLayerId)) {
                             // Nodes became unavailable, remove the layer
                             console.log(`Simplified Removing layer ${targetLayerId} because nodes are no longer available.`);
                             map.removeLayer(targetLayerId);
                             activeLayerIdRef.current = null; // Reflect that no layer is active anymore
                        } 
                        // Else: Correct layer with correct node state (either present or absent) is already there.
                    } else { 
                        // Target layer is DIFFERENT from active layer
                        console.log(`Simplified: Target changed. Old: ${activeLayerIdRef.current}, New: ${targetLayerId}`);
                        
                        // Remove the old layer if it exists
                        if (activeLayerIdRef.current && map.getLayer(activeLayerIdRef.current)) {
                             console.log(`Simplified Removing old: ${activeLayerIdRef.current}`);
                             map.removeLayer(activeLayerIdRef.current);
                        }

                        // Add the new layer ONLY if nodes are available
                        if (indoorPathNodes && indoorPathNodes.length > 0) {
                            console.log(`Simplified Adding new layer ${targetLayerId} with nodes.`);
                            if (!map.getLayer(targetLayerId)) {
                                 console.log(`[Custom3DLayerManager] Calling createCustomLayer (new). Nodes: ${indoorPathNodes?.length ?? 0}`);
                                 const newLayer = createCustomLayer(map, targetAttributes, indoorPathNodes);
                                 if (!map.getLayer(newLayer.id)) { 
                                     map.addLayer(newLayer, MAP_LAYER_BEFORE_ID);
                                 } else { console.warn(`Simplified: Layer ${newLayer.id} existed just before addLayer (new).`); }
                            } else {
                                console.warn(`Simplified: Layer ${targetLayerId} already exists unexpectedly.`);
                            }
                            activeLayerIdRef.current = targetLayerId; // Set active ref only if added
                        } else {
                            console.log(`Simplified: Not adding new layer ${targetLayerId} because no nodes are available yet.`);
                             activeLayerIdRef.current = null; // No layer added
                        }
                    }
                } else { 
                     // No target selected, remove active layer if it exists
                     if (activeLayerIdRef.current && map.getLayer(activeLayerIdRef.current)) {
                          console.log(`Simplified Removing layer ${activeLayerIdRef.current} because target is null.`);
                          map.removeLayer(activeLayerIdRef.current);
                     }
                     activeLayerIdRef.current = null;
                }
            }

        } catch (error) {
            console.error("Error managing 3D layers (Simplified):", error);
            // Attempt cleanup on error
            try {
                if (map.getLayer(defaultBuildingsLayerId)) map.setLayoutProperty(defaultBuildingsLayerId, 'visibility', 'visible');
                if (activeLayerIdRef.current && map.getLayer(activeLayerIdRef.current)) map.removeLayer(activeLayerIdRef.current);
            } catch (cleanupError) { /* ignore */ }
            activeLayerIdRef.current = null;
        }

    }, [map, zoom, selectedLocation, indoorPathNodes]); // Dependencies trigger update

     // Cleanup effect: Remove the active layer if the component unmounts
     useEffect(() => {
        return () => {
            if (map && !map._removed && activeLayerIdRef.current && map.getLayer(activeLayerIdRef.current)) {
                console.log("Unmount: Removing active layer", activeLayerIdRef.current);
                try {
                    map.removeLayer(activeLayerIdRef.current);
                } catch (e) { console.warn("Error removing layer on unmount:", e); }
            }
        };
    }, [map]); // Depends only on map

    return null;
} 