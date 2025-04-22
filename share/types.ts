export type pNodeDTO = {
    id: number;
    description: string;
    longitude: number;
    latitude: number;
    neighbors: { id: number }[]; // Only include IDs of neighbors
};