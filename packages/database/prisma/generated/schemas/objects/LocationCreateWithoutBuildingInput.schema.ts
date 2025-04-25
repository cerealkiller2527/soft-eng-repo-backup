import { z } from 'zod';
import { DepartmentCreateNestedOneWithoutLocationInputObjectSchema } from './DepartmentCreateNestedOneWithoutLocationInput.schema';
import { NodeCreateNestedOneWithoutLocationInputObjectSchema } from './NodeCreateNestedOneWithoutLocationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateWithoutBuildingInput> = z
    .object({
        floor: z.number(),
        suite: z.string().optional().nullable(),
        Department: z
            .lazy(() => DepartmentCreateNestedOneWithoutLocationInputObjectSchema)
            .optional(),
        node: z.lazy(() => NodeCreateNestedOneWithoutLocationInputObjectSchema).optional(),
    })
    .strict();

export const LocationCreateWithoutBuildingInputObjectSchema = Schema;
