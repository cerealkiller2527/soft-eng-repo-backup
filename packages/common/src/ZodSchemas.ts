import {z} from "zod";

export const NodeTypeZod = z.enum([
    "Entrance",
    "Intermediary",
    "Staircase",
    "Elevator",
    "Location",
    "Help_Desk",
    "Parking"
]);

export const pNodeZod = z.object({
    id: z.number(),
    description: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    floor: z.number(),
    outside: z.boolean(),
    type: NodeTypeZod,
    neighbors: z.array(z.number()), // Only include IDs of neighbors
})

export type pNodeZT = z.infer<typeof pNodeZod>

export const searchInput = z.object({
    buildingId: z.number(),
    endDeptName: z.string(),
    dropOffLatitude: z.number(),
    dropOffLongitude: z.number(),
    driving: z.boolean(),
})

export const searchInputForRouter = z.object({
    buildingName: z.string(),
    endDeptName: z.string(),
    dropOffLatitude: z.number(),
    dropOffLongitude: z.number(),
    driving: z.boolean(),
})

export const searchOutput = z.object({
    toParking: z.array(pNodeZod),
    toDepartment: z.array(pNodeZod),
})

