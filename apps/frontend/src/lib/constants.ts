import type { Hospital, Directions } from "@/types/hospital"
import type mapboxgl from 'mapbox-gl';
import {LngLatLike} from "mapbox-gl"
import type { SkyLayerSpecification, FillExtrusionLayerSpecification, Expression, CameraOptions } from 'mapbox-gl';
// Import 3D types
import type { BuildingAttributes, TempNode, imageConstants} from '@/lib/map/3d/types';

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
      coordinates: [-71.149208, 42.325599],
      zoom: 17.76,
      pitch: 67.57,
      bearing: 167.50,
  },
  0: {
    coordinates: [-71.107050, 42.336130],
    zoom: 16.99,
    pitch: 61.17,
    bearing: -12.07,
  },
  4: {
    coordinates: [-71.128046, 42.301314],
    zoom: 18.00,
    pitch: 60.53,
    bearing: -42.75,
  },
  2: {
      coordinates: [-71.266429, 42.093084],
      zoom: 17.52,
      pitch: 77.33,
      bearing: -21.55,
  },
  3: {
      coordinates: [-71.267716, 42.093336],
      zoom: 17.52,
      pitch: 77.33,
      bearing: -21.55,
  }

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
const Pat20SceneCoords: LngLatLike = [-71.26599086652641, 42.09277375925052];
const Pat20BuildingCoords: LngLatLike = [-71.26646779246585, 42.093016005061315];
const Pat20BuildingMaskCoords: LngLatLike = [-71.26629497632113, 42.09248760267727];
const Pat20ImageConstants: imageConstants = {
  width: 84,
  height: 68,
  offsetEast: 3,
  offsetNorth: 5.0
}
const Patriot20BuildingAttributes: BuildingAttributes = {
  sceneCoords: Pat20SceneCoords,
  buildingCoords: Pat20BuildingCoords,
  buildingPaths: ["/Pat20Floor.glb", "/Pat20Floor.glb", "/Pat20Floor.glb", "/Pat20Floor.glb"],
  buildingMaskPath: '/PatExterior.glb',
  buildingRotation: -Math.PI/10,
  floorHeight: 20,
  buildingMaskCoords: Pat20BuildingMaskCoords,
  floorPlanPaths: ["/Pat20Floor1.png", "/Pat20Floor2.png", "/Pat20Floor3.png", "/Pat20Floor4.png"],
  nodes: examplePathNodes,
  imageConstants: Pat20ImageConstants
}

const Pat22SceneCoords: LngLatLike = [-71.26696722883923, 42.09258410491776]
const Pat22BuildingCoords: LngLatLike = [-71.26697223199403, 42.09223043183033]
const Pat22BuildingMaskCoords: LngLatLike = [-71.26629497632113, 42.09248760267727]
const Pat22ImageConstants: imageConstants = {
    width: 68,
    height: 87,
    offsetEast: -2,
    offsetNorth: 5
}
const Patriot22BuildingAttributes = {
    sceneCoords: Pat22SceneCoords,
    buildingCoords: Pat22BuildingCoords,
    buildingPaths: ["Pat22Floor.gltf", "Pat22Floor.gltf", "Pat22Floor.gltf", "Pat22Floor.gltf"],
    buildingMaskPath: "PatExterior.glb",
    buildingRotation: -Math.PI/10,
    floorHeight: 20,
    buildingMaskCoords: Pat22BuildingMaskCoords,
    floorPlanPaths: ['22PatFloor1.png', '22PatFloor2.png', "/22PatFloor3.png", "22PatFloor4.png"],
    nodes: examplePathNodes,
    imageConstants: Pat22ImageConstants
}

const MainSceneCoords: LngLatLike = [-71.106549430016, 42.335842853824396]
const MainBuildingCoords: LngLatLike = [-71.10636459548073, 42.33526357549587]
const MainBuildingMaskCoords: LngLatLike = [-71.10636459548073, 42.33526357549587]
const MainImageConstants: imageConstants = {
    width: 450,
    height: 230,
    offsetEast: -25,
    offsetNorth: 5
}
const MainBuildingAttributes: BuildingAttributes = {
    sceneCoords: MainSceneCoords,
    buildingCoords: MainBuildingCoords,
    buildingPaths: ["MainFloor1.gltf", "/MainFloor2.gltf"], // one per floor
    buildingMaskPath: "MainExterior.gltf",
    buildingRotation: 0,
    floorHeight: 45,
    buildingMaskCoords: MainBuildingMaskCoords,
    floorPlanPaths: ['MainFloor1.png', 'MainFloor2.png'],
    nodes: examplePathNodes,
    imageConstants: MainImageConstants
}

const FaulknerSceneCoords: LngLatLike = [-71.12834142530612, 42.30150822410094]
const FaulknerBuildingCoords: LngLatLike = [-71.12855652822122, 42.300928445283546]
const FaulknerBuildingMaskCoords: LngLatLike = [-71.12855652822122, 42.300928445283546]
const FaulknerImageConstants: imageConstants = {
    width: 223,
    height: 170,
    offsetEast: 23,
    offsetNorth: 13
}
const FaulknerBuildingAttributes: BuildingAttributes = {
    sceneCoords: FaulknerSceneCoords,
    buildingCoords: FaulknerBuildingCoords,
    buildingPaths: ["FaulknerFloor1.gltf"], // one per floor
    buildingMaskPath: "/Faulkner/FaulknerExterior.gltf",
    buildingRotation: 0,
    floorHeight: 45,
    buildingMaskCoords: FaulknerBuildingMaskCoords,
    floorPlanPaths: ['FaulknerFloor1.png'],
    nodes: examplePathNodes,
    imageConstants: FaulknerImageConstants
}

const ChestnutSceneCoords: LngLatLike = [-71.14974760810384, 42.325950820451]
const ChestnutBuildingCoords: LngLatLike = [-71.1500853668773, 42.325693309988054]
const ChestnutBuildingMaskCoords: LngLatLike = [-71.1500853668773, 42.325693309988054]
const ChestnutImageConstants: imageConstants = {
    width: 72,
    height: 63,
    offsetEast: 5,
    offsetNorth: 2
}
const ChestnutBuildingAttributes: BuildingAttributes = {
    sceneCoords: ChestnutSceneCoords,
    buildingCoords: ChestnutBuildingCoords,
    buildingPaths: ["ChestnutFloor1.gltf"], // one per floor
    buildingMaskPath: "ChestnutExterior.gltf",
    buildingRotation: 0,
    floorHeight: 25,
    buildingMaskCoords: ChestnutBuildingMaskCoords,
    floorPlanPaths: ['ChestnutFloor1.png'],
    nodes: examplePathNodes,
    imageConstants: ChestnutImageConstants,
}

// Exported constant mapping hospital IDs to their attributes
export const HOSPITAL_BUILDING_ATTRIBUTES: Record<number, BuildingAttributes> = {
    0: MainBuildingAttributes,
    1: ChestnutBuildingAttributes,
    2: Patriot20BuildingAttributes, // this is the correct ID for 20 Patriot Place
    3: Patriot22BuildingAttributes, // this is the correct ID for 22 Patriot Place
    4: FaulknerBuildingAttributes,
};

// ==========================================================

// Zoom level at which custom 3D buildings appear
export const CUSTOM_BUILDING_ZOOM_THRESHOLD = 16.9; // Slightly less than 17 to reduce flickering
