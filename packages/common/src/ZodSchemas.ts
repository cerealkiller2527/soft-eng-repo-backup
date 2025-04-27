import {z} from "zod";

export const pNodeZod = z.object({
    id: z.number(),
    description: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    floor: z.number(),
    neighbors: z.array(z.number()), // Only include IDs of neighbors
})

export const searchInput = z.object({
    buildingId: z.number(),
    endDeptName: z.string(),
    dropOffLatitude: z.number(),
    dropOffLongitude: z.number(),
    driving: z.boolean(),
})

export const searchOutput = z.object({
    toParking: z.array(pNodeZod),
    toDepartment: z.array(pNodeZod),
})