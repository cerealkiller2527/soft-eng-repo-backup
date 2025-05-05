import type { LngLatLike } from 'mapbox-gl';

// Node within the 3D model (e.g., path waypoints, elevators)
export type TempNode = {
    lat: number;
    long: number;
    floor: number;
    kind: "poi" | "elevator" | "inter" | "stairs" | "path"; // Added stairs/path based on AddNodeMarkers.ts
};

export type imageConstants = {
    width: number,
    height: number,
    offsetEast: number,
    offsetNorth: number
}

// Attributes defining a specific 3D building model and its context
export type BuildingAttributes = {
    sceneCoords: LngLatLike; // Origin for the THREE.js scene
    buildingCoords: LngLatLike; // Coordinates for placing the building model
    buildingPaths: string[]; // Paths to GLTF/GLB models for each floor
    buildingMaskPath: string; // Path to the exterior shell/mask model
    buildingRotation: number; // Rotation in radians around the Y-axis
    floorHeight: number; // Vertical distance between floors in meters
    buildingMaskCoords: LngLatLike; // Coordinates for placing the mask model
    floorPlanPaths: string[]; // Paths to 2D floor plan images (If needed later)
    nodes: TempNode[]; // Path nodes within the building
    imageConstants: imageConstants // image constants for mapping
}; 