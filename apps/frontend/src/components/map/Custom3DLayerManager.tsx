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
    activeType: 'parking' | 'department' | null;
}

export function Custom3DLayerManager({ indoorPathNodes, activeType }: Custom3DLayerManagerProps) {
    const { map, zoom, selectedLocation } = useMap();
    // Keep track of the ID currently added to the map
    const activeLayerIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (!map || map._removed) return;

        const defaultBuildingsLayerId = MAP_LAYER_IDS.BUILDINGS;
        const targetHospitalId = selectedLocation?.id;
        let targetAttributes: BuildingAttributes | undefined = undefined;
        let targetLayerId: string | null = null;

        // Determine the target layer based on selection
        if (targetHospitalId !== undefined && HOSPITAL_BUILDING_ATTRIBUTES?.[targetHospitalId]) {
            targetAttributes = HOSPITAL_BUILDING_ATTRIBUTES[targetHospitalId];
            targetLayerId = `custom-3d-${targetHospitalId}`; 
        }

        console.log(`[Custom3DLayerManager Update] Zoom: ${zoom.toFixed(2)}, TargetID: ${targetLayerId}, ActiveID: ${activeLayerIdRef.current}, ActiveType: ${activeType}, Nodes: ${indoorPathNodes?.length ?? 0}`);

        try {
            // --- REMOVE ZOOM LOGIC and default layer visibility checks ---
            /*
            // Ensure default layer exists (No longer needed)
            const defaultLayer = map.getLayer(defaultBuildingsLayerId);
            if (!defaultLayer) { ... }
            
            // --- Logic based on Zoom --- 
            if (zoom <= zoomThreshold) {
                // ZOMMED OUT: Show default, remove custom
                if (map.getLayoutProperty(defaultBuildingsLayerId, 'visibility') !== 'visible') { ... }
                if (activeLayerIdRef.current && map.getLayer(activeLayerIdRef.current)) { ... }
                activeLayerIdRef.current = null;
            } else { 
                // ZOMMED IN: Hide default, manage custom
                if (map.getLayoutProperty(defaultBuildingsLayerId, 'visibility') !== 'none') { ... }
            */
            // --- END REMOVAL ---

            // --- Logic now runs regardless of zoom --- 
            
            // 1. Determine if the active layer needs removal (due to target change)
            if (activeLayerIdRef.current && activeLayerIdRef.current !== targetLayerId) {
                console.log(`[Custom3DLayerManager] Target changed. Removing old layer: ${activeLayerIdRef.current}`);
                if (map.getLayer(activeLayerIdRef.current)) {
                     map.removeLayer(activeLayerIdRef.current);
                }
                activeLayerIdRef.current = null;
            }

            // 2. Determine if the target layer should be added or updated
            // Layer should be visible if zoomed in and a target hospital is selected.
            // The path *within* the layer depends on indoorPathNodes being passed.
            const shouldLayerBeVisible = targetLayerId && targetAttributes; // Removed dependency on activeType and indoorPathNodes here
            const isLayerCurrentlyVisible = activeLayerIdRef.current && map.getLayer(activeLayerIdRef.current);

            if (shouldLayerBeVisible) {
                if (!isLayerCurrentlyVisible || activeLayerIdRef.current !== targetLayerId) {
                     // Add the new target layer (or update if ID is same but layer somehow got removed)
                     console.log(`[Custom3DLayerManager] Adding/Updating layer: ${targetLayerId}. Nodes: ${indoorPathNodes?.length}`);
                     
                     // Explicitly remove if it exists (handles edge case where ID is same but layer needs refresh)
                     if (map.getLayer(targetLayerId)) { 
                         console.log(`   Removing existing ${targetLayerId} before adding update...`);
                         map.removeLayer(targetLayerId); 
                     }

                     try {
                         // Add explicit check for targetAttributes
                         if (!targetAttributes) {
                             console.error("[Custom3DLayerManager] Attempted to create layer but targetAttributes were undefined.");
                             throw new Error("Missing targetAttributes for layer creation."); // Throw to prevent proceeding
                         }
                         const pathShouldExistInitially = activeType === 'department' && indoorPathNodes && indoorPathNodes.length > 0;
                         const initialNodes = pathShouldExistInitially ? indoorPathNodes : null;
                         console.log(`   Adding new layer: ${targetLayerId}. Initial nodes count: ${initialNodes?.length ?? 0}`);
                         
                         const newLayer = createCustomLayer(map, targetAttributes, initialNodes);
                         if (!map.getLayer(newLayer.id)) {
                             map.addLayer(newLayer, MAP_LAYER_BEFORE_ID);
                             activeLayerIdRef.current = newLayer.id; // Update ref *after* adding
                             console.log(`   Layer ${newLayer.id} added successfully.`);
                         } else {
                              console.warn(`[Custom3DLayerManager] Layer ${newLayer.id} existed just before addLayer call.`);
                              activeLayerIdRef.current = newLayer.id; // Ensure ref is set even if addLayer was skipped
                         }
                     } catch (creationError) {
                          console.error(`[Custom3DLayerManager] Error creating layer ${targetLayerId}:`, creationError);
                          activeLayerIdRef.current = null; // Ensure ref is null if creation failed
                     }
                } 
                // Else: Correct layer is already visible, do nothing.
            } else {
                // Layer should NOT be visible (no target, no nodes, etc.)
                if (isLayerCurrentlyVisible) {
                    console.log(`[Custom3DLayerManager] Conditions not met. Removing active layer: ${activeLayerIdRef.current}`);
                    map.removeLayer(activeLayerIdRef.current);
                    activeLayerIdRef.current = null;
                }
                // Else: No layer should be visible, and none is. Do nothing.
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

    }, [map, selectedLocation, indoorPathNodes, activeType]); // Dependencies trigger update

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