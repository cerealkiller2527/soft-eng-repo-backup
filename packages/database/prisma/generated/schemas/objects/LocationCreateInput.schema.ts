import { z } from 'zod';
import { BuildingCreateNestedOneWithoutLocationInputObjectSchema } from './BuildingCreateNestedOneWithoutLocationInput.schema';
import { DepartmentCreateNestedOneWithoutLocationInputObjectSchema } from './DepartmentCreateNestedOneWithoutLocationInput.schema';
import { NodeCreateNestedOneWithoutLocationInputObjectSchema } from './NodeCreateNestedOneWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateInput> = z
    .object({
        floor: z.number(),
        suite: z.string().optional().nullable(),
        building: z.lazy(() => BuildingCreateNestedOneWithoutLocationInputObjectSchema),
        Department: z
            .lazy(() => DepartmentCreateNestedOneWithoutLocationInputObjectSchema)
            .optional(),
        node: z.lazy(() => NodeCreateNestedOneWithoutLocationInputObjectSchema).optional(),
    })
    .strict();

export const LocationCreateInputObjectSchema = Schema;
