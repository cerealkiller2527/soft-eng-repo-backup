import { z } from 'zod';
import { BuildingCreateNestedOneWithoutLocationInputObjectSchema } from './BuildingCreateNestedOneWithoutLocationInput.schema';
import { NodeCreateNestedOneWithoutLocationInputObjectSchema } from './NodeCreateNestedOneWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateWithoutDepartmentInput> = z
    .object({
        floor: z.number(),
        suite: z.string().optional().nullable(),
        building: z.lazy(() => BuildingCreateNestedOneWithoutLocationInputObjectSchema),
        node: z.lazy(() => NodeCreateNestedOneWithoutLocationInputObjectSchema).optional(),
    })
    .strict();

export const LocationCreateWithoutDepartmentInputObjectSchema = Schema;
