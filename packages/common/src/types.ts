export interface Location {
  id: number;
  name: string;
  x: number;
  y: number;
  floor: number;
}

export interface PathNode {
  id: number;
  location: Location;
  neighbors: number[];
}

export interface Path {
  nodes: PathNode[];
  coordinates: { x: number; y: number }[];
}

export interface PathfindingError {
  code: 'INVALID_NODE' | 'NO_PATH_FOUND' | 'INTERNAL_ERROR';
  message: string;
}
