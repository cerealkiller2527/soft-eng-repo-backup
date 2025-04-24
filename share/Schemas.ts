import {z} from "zod";

/**
 * common zod schema for nodes in routers
 */
export const nodeSchema = z.object({
    id: z.number(),
    description: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    floor: z.number(),
    neighbors: z.object({id: z.number()}), // Only include IDs of neighbors
})

/**
 * common zod schema for edges in routers
 */
export const edgeSchema = z.object({
    id: z.number(),
    toNodeId: z.number(),
    fromNodeId: z.number(),
})

/**
 * common zod schema for locations in routers
 */
export const locationSchema = z.array(z.object({
    id: z.number(),
    floor: z.number(),
    suite: z.string().nullable(),
    buildingId: z.number(),
    building: z.object({
        id: z.number(),
        name: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
    }),
    nodeID: z.number().nullable(),
    node: z
        .object({
            id: z.number(),
            type: z.enum([
                "Entrance",
                "Intermediary",
                "Staircase",
                "Elevator",
                "Location",
                "Help_Desk",
            ]),
            description: z.string(),
            lat: z.number(),
            long: z.number(),
        })
        .nullable(),
}))

/**
 * common zod schema for departments in routers
 * uses locationSchema for 'Location'
 */
export const departmentSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    phoneNumber: z.string(),
    DepartmentServices: z.array(
        z.object({
            service: z.object({
                id: z.number(),
                name: z.string(),
            }),
        }),
    ),
    Location: locationSchema
});

/**
 * zod schema for csv import/export
 */
export const csvSchema = z.object({
    "Building ID": z.string().optional(),
    "Building Name": z.string(),
    "Building Address": z.string(),
    "Building Phone": z.string(),
    "Location ID": z.string().optional(),
    Floor: z.string(),
    Suite: z.string().optional(),
    "Node ID": z.string().optional(),
    "Node Type": z.string(),
    "Node Description": z.string(),
    "Node Coordinates": z.string(),
    "From Edges": z.string(),
    "To Edges": z.string(),
    "Department ID": z.string().optional(),
    "Department Name": z.string(),
    "Department Phone": z.string(),
    "Department Description": z.string().optional(),
    Services: z.string(),
})

/**
 * zod schema for a user in routers
 */
export const userSchema = z.object({
    username: z.string(),
    password: z.string(),
})

/**
 * zod schema to define input for search router
 */
export const searchSchema = z.object({
    buildingId: z.number(),
    endNodeId: z.number(),
    startLat: z.number(),
    startLong: z.number(),
    driving: z.boolean(),
    algorithm: z.string(),
})

