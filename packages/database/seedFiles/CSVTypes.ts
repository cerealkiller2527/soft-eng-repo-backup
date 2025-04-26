import z from "zod";
import type {Prisma} from "../.prisma/client";

export const departmentCSVRow = z.object({
    buildingName: z.string(),
    name: z.string(),
    description: z.string(),
    phoneNumber: z.string(),
    floor: z.number().int(),
    suite: z.string()
});