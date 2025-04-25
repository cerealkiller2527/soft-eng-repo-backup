import { z } from 'zod';
import { LocationCreateManyDepartmentInputObjectSchema } from './LocationCreateManyDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationCreateManyDepartmentInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => LocationCreateManyDepartmentInputObjectSchema),
            z.lazy(() => LocationCreateManyDepartmentInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const LocationCreateManyDepartmentInputEnvelopeObjectSchema = Schema;
