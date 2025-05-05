import type { Hospital, Directions } from "@/types/hospital"
import type mapboxgl from 'mapbox-gl';
import type { SkyLayerSpecification, FillExtrusionLayerSpecification, Expression, CameraOptions } from 'mapbox-gl';
// Import 3D types
import type { BuildingAttributes, TempNode } from '@/lib/map/3d/types';

// API Keys
export const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '';

// Define interface for specific view params (optional)
interface HospitalViewParams extends Partial<Pick<CameraOptions, 'zoom' | 'pitch' | 'bearing'>> {
  coordinates?: [number, number]; // Optional coordinate override
  // Add speed, curve etc. if needed: speed?: number;
}

export const Z_INDEX = {
  base: 0,
  map: 10,
  header: 20,
  sidebar: 30,
  modal: 40,
  toast: 50,
}

export const SPACING = {
  sm: "0.75rem",
}

// hardcoded data fix - i hate this, but it's a quick fix for now - fml

export const baseHospitalData: Array<Hospital> = [
  { 
    id: 1, 
    name: "Chestnut Hill Medical Center",
    address: "25 Boylston St, Chestnut Hill, MA 02467", 
    phone: "800-294-9999", 
    isOpen: true, 
    website: "https://www.brighamandwomens.org/about-bwh/locations/health-care-center-850-boylston-street-chestnut-hill",
    coordinates: [-71.14951471, 42.3262626],
    placeId: undefined
  },
  { 
    id: 2, 
    name: "20 Patriot Place",
    address: "20 Patriot Pl, Foxborough, MA 02035", 
    phone: "508-718-4400", 
    isOpen: true, 
    website: "https://www.brighamandwomens.org/foxborough-health-care-center/foxborough-urgent-care-center",
    coordinates: [-71.2665262516987, 42.09252289293114],
    placeId: undefined
  },
  { 
    id: 3, 
    name: "22 Patriot Place", 
    address: "22 Patriot Pl 3rd Floor, Foxborough, MA 02035", 
    phone: "866-378-9164", 
    isOpen: true, 
    website: "https://www.brighamandwomens.org/about-bwh/locations/health-care-center-20-patriot-place-foxborough",
    coordinates: [-71.2665262516987, 42.09252289293114],
    placeId: undefined
  },
  { 
    id: 4, 
    name: "Faulkner Hospital",
    address: "1153 Centre St, Jamaica Plain, MA 02130", 
    phone: "617-983-7000", 
    isOpen: true, 
    website: "http://www.brighamandwomensfaulkner.org/",
    coordinates: [-71.12762714, 42.3012168],
    placeId: undefined
  },
  { 
    id: 0, 
    name: "Main Campus", 
    address: "75 Francis St, Boston, MA 02115", 
    phone: "617-732-25500", 
    isOpen: true, 
    website: "https://www.massgeneralbrigham.org/en/patient-care/services-and-specialties/locations/brigham-and-womens-hospital",
    coordinates: [-71.10608207, 42.33532599],
    placeId: undefined
  }
]

export const MAPBOX_WORKER_COUNT = 4;

export const MAP_LAYER_IDS = {
  SOURCE: 'routes-source',
  INACTIVE_CASING: 'routes-inactive-casing',
  ACTIVE_CASING: 'routes-active-casing',
  INACTIVE_ROUTE: 'routes-inactive',
  ACTIVE_ROUTE: 'routes-active',
  SKY: 'sky',
  BUILDINGS: '3d-buildings',
};

export const MAP_LAYER_BEFORE_ID = 'road-label';

export const MAP_POPUP_OPTIONS = {
  offset: 25,
  maxWidth: '240px',
};

export const ROUTE_FIT_BOUNDS_OPTIONS = {
  padding: { top: 100, bottom: 150, left: 460, right: 100 },
  pitch: 45,
  duration: 1500,
};

export const DEFAULT_FLY_TO_OPTIONS = {
  pitch: 70,
  speed: 1.8,
  curve: 1.42,
  zoom: 18,
};

// Define the new map for specific hospital views
export const HOSPITAL_SPECIFIC_VIEWS: Record<number, HospitalViewParams> = {
  // Example: Replicate Chestnut Hill view
  1: {
    coordinates: [-71.167169, 42.323224],
    zoom: 19.56,
    pitch: 71.00,
    bearing: 16.00,
  },
  // Add entries for other hospitals here if needed, e.g.:
  // 4: { zoom: 17.5, pitch: 65 }, // Faulkner example
};

export const SKY_LAYER_CONFIG: SkyLayerSpecification = {
  id: MAP_LAYER_IDS.SKY,
  type: 'sky',
  paint: {
    'sky-type': 'atmosphere',
    'sky-atmosphere-sun': [0.0, 0.0],
    'sky-atmosphere-sun-intensity': 15,
  },
};

export const BUILDINGS_LAYER_CONFIG: FillExtrusionLayerSpecification = {
  id: MAP_LAYER_IDS.BUILDINGS,
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'] as Expression,
  type: 'fill-extrusion',
  minzoom: 15,
  paint: {
    'fill-extrusion-color': '#aac7e9',
    'fill-extrusion-height': [
      'interpolate', ['linear'], ['zoom'],
      15, 0, 15.5, ['get', 'height']
    ] as Expression,
    'fill-extrusion-base': [
      'interpolate', ['linear'], ['zoom'],
      15, 0, 15.5, ['get', 'min_height']
    ] as Expression,
    'fill-extrusion-opacity': 0.8
  }
};

export const CONGESTION_COLORS: Record<string, string> = {
  low: '#0059b3',
  moderate: '#ffa500',
  heavy: '#ff4500',
  severe: '#b22222',
  unknown: '#0059b3',
};

export const CONGESTION_TEXT_COLORS: Record<string, string> = {
  low: 'text-green-600',
  moderate: 'text-orange-500',
  heavy: 'text-red-600',
  severe: 'text-red-800',
  unknown: 'text-gray-500',
};

export const MAPBOX_DIRECTIONS_ANNOTATIONS = 'duration,distance,congestion';

export const GOOGLE_PLACES_FIELDS = {
  DETAILS: 'name,formatted_address,international_phone_number,website,geometry,opening_hours,place_id',
  GEOMETRY: 'geometry',
  PLACE_ID: 'place_id',
};

export const CONVERSION_FACTORS = {
  METERS_TO_MILES: 0.000621371,
};
export const EARTH_RADIUS_MILES = 3958.8;
export const AUTOCOMPLETE_DEBOUNCE_WAIT = 300;
export const AUTOCOMPLETE_MIN_CHARS = 2;
export const HOSPITAL_STATUS_PRIORITIES = {
  OPEN: 0,
  UNKNOWN: 1,
  CLOSED: 2,
};

export const LAYOUT_DIMENSIONS = {
  HEADER_HEIGHT: 64,
  SIDEBAR_WIDTH: 420,
  SIDEBAR_PADDING_X: '0.75rem',
  SIDEBAR_PADDING_Y: '1rem',
  SIDEBAR_TRANSITION_MS: 300,
};

export const DEFAULT_AVATAR_PATH = "/vibrant-street-market.png";
export const HOSPITAL_LOGO_PATH = "/bwh-logo-icon.svg";

export const UI_PLACEHOLDERS = {
  LOCATION_SEARCH: "Enter your location",
  HOSPITAL_SEARCH: "Search hospitals...",
};

export const MAPBOX_SUPPORT_REASONS = {
  NO_WEBGL: "Your browser doesn't support WebGL, which is required for Mapbox GL.",
  WEBGL_DISABLED: "Your browser supports WebGL, but it may be disabled or unavailable.",
  UNKNOWN: "Mapbox GL isn't supported by your browser for an unknown reason.",
};

// ==================== 3D Building Data ====================

// Adapted tempNodes from 3dmaps example (ensure kind matches TempNode type)
// TODO: Replace with actual node data from backend or a dedicated data source
const examplePathNodes: TempNode[] = [
  {
    lat: 42.09248682590311,
    long: -71.26629410633672,
    floor: 1,
    kind: "path" // Changed from "inter"
  },
  {
    lat: 42.09277375925052,
    long: -71.26599086652641,
    floor: 1,
    kind: "path" // Changed from "inter"
  },
  {
    lat: 42.09324032652947,
    long: -71.26658286746988,
    floor: 1,
    kind: "elevator"
  },
  {
    lat: 42.09324032652947,
    long: -71.26658286746988,
    floor: 2,
    kind: "elevator"
  },
  {
    lat: 42.09277375925052,
    long: -71.26599086652641,
    floor: 2,
    kind: "path" // Changed from "inter"
  },
  {
    lat: 42.09248682590311,
    long: -71.26629410633672,
    floor: 2,
    kind: "elevator" // Changed from "elevator" to end path?
  },
   {
    lat: 42.09248682590311,
    long: -71.26629410633672,
    floor: 2,
    kind: "poi" // Example POI at the end
  }
];

// Define attributes for each hospital (adapt from 3dmaps example)
const Patriot20BuildingAttributes: BuildingAttributes = {
    // Use hospital ID 2 for "20 Patriot Place"
    sceneCoords: [-71.26599086652641, 42.09277375925052],
    buildingCoords: [-71.26646779246585, 42.093016005061315],
    buildingPaths: ["/maps/Pat20Floor.glb", "/maps/Pat20Floor.glb", "/maps/Pat20Floor.glb", "/maps/Pat20Floor.glb"], // Ensure these paths are correct relative to /public
    buildingMaskPath: '/maps/Pat20Exterior.glb',
    buildingRotation: -Math.PI/10,
    floorHeight: 20,
    buildingMaskCoords: [-71.26629497632113, 42.09248760267727],
    nodes: examplePathNodes, // Use the example nodes for now
    numFloors: 4 // Based on buildingPaths array length
};

const Patriot22BuildingAttributes: BuildingAttributes = {
    // Use hospital ID 3 for "22 Patriot Place"
    sceneCoords: [-71.26696722883923, 42.09258410491776],
    buildingCoords: [-71.26697223199403, 42.09223043183033],
    buildingPaths: ["/maps/Pat22Floor.gltf", "/maps/Pat22Floor.gltf", "/maps/Pat22Floor.gltf", "/maps/Pat22Floor.gltf"],
    buildingMaskPath: "/maps/Pat20Exterior.glb", // Assuming same mask for now?
    buildingRotation: -Math.PI/10,
    floorHeight: 20,
    buildingMaskCoords: [-71.26629497632113, 42.09248760267727], // Same mask coords as Pat20?
    nodes: examplePathNodes, // Use the example nodes for now
    numFloors: 4
};

const MainBuildingAttributes: BuildingAttributes = {
    // Use hospital ID 0 for "Main Campus"
    sceneCoords: [-71.106549430016, 42.335842853824396],
    buildingCoords: [-71.10636459548073, 42.33526357549587],
    buildingPaths: ["/maps/MainFloor1.gltf", "/maps/MainFloor2.gltf"],
    buildingMaskPath: "/maps/MainExterior.gltf",
    buildingRotation: 0,
    floorHeight: 45,
    buildingMaskCoords: [-71.10636459548073, 42.33526357549587],
    nodes: examplePathNodes, // Use the example nodes for now
    numFloors: 2
};

// Exported constant mapping hospital IDs to their attributes
export const HOSPITAL_BUILDING_ATTRIBUTES: Record<number, BuildingAttributes> = {
    0: MainBuildingAttributes,
    // 1: ChestnutHill attributes would go here if available
    2: Patriot20BuildingAttributes, // Correct ID for 20 Patriot Place
    3: Patriot22BuildingAttributes, // Correct ID for 22 Patriot Place
    // 4: Faulkner attributes would go here if available
};

// ==========================================================

// Zoom level at which custom 3D buildings appear
export const CUSTOM_BUILDING_ZOOM_THRESHOLD = 16.9; // Slightly less than 17 to reduce flickering
