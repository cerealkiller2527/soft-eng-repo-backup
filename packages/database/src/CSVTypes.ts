import z from "zod";
import type {Prisma} from "../.prisma/client";

export const departmentCSVRow = z.object({
    buildingName: z.string(),
    name: z.string(),
    description: z.string(),
    services: z.string(),
    phoneNumber: z.string(),
    floor: z.number().int(),
    suite: z.string()
});

export const buildingCSVRow = z.object({
    id: z.number().int(),
    name: z.string(),
    address: z.string(),
    phoneNumber: z.string(),

});


export const nodeCSVRow = z.object({
    description: z.string(),
    lat: z.number(),
    long: z.number(),
    type: z.string(),
    floor: z.number().int(),
    outside: z.boolean(),
    building: z.string()
});

export const nodeWithEdgesRow = nodeCSVRow.extend({edges: z.string()})

export const edgeCSVRow = z.object({
    fromNode: z.string(),
    toNode: z.string(),
    building: z.string(),
    floor: z.number()
})

export const employeeCSVRow = z.object({
    employee: z.string(),
    type: z.string(),
    services: z.string(),
    languages: z.string(),
})


export const serviceRequestRow = z.object({
    requestType: z.string(),
    status: z.string(),
    description: z.string(),
    assignedTo: z.string(),
    assignedFrom: z.string(),
    priority: z.string(),
    location: z.string(),
    deadline: z.string(),
    avType: z.string(),
    fromWhere: z.string(),
    toWhere: z.string(),
    transType: z.string(),
    patientName: z.string(),
    pickupTime: z.string(),
    equipments: z.string(),
    language: z.string(),
    startTime: z.string(),
    endTime: z.string()
})