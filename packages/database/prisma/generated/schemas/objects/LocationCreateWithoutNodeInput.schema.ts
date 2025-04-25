import { z } from 'zod';
import { BuildingCreateNestedOneWithoutLocationInputObjectSchema } from './BuildingCreateNestedOneWithoutLocationInput.schema';
import { DepartmentCreateNestedOneWithoutLocationInputObjectSchema } from './DepartmentCreateNestedOneWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateWithoutNodeInput> = z
    .object({
        floor: z.number(),
        suite: z.string().optional().nullable(),
        building: z.lazy(() => BuildingCreateNestedOneWithoutLocationInputObjectSchema),
        Department: z
            .lazy(() => DepartmentCreateNestedOneWithoutLocationInputObjectSchema)
            .optional(),
    })
    .strict();

export const LocationCreateWithoutNodeInputObjectSchema = Schema;
