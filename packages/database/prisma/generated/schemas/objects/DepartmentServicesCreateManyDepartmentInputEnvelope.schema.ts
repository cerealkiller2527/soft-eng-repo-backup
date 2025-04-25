import { z } from 'zod';
import { DepartmentServicesCreateManyDepartmentInputObjectSchema } from './DepartmentServicesCreateManyDepartmentInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateManyDepartmentInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => DepartmentServicesCreateManyDepartmentInputObjectSchema),
            z.lazy(() => DepartmentServicesCreateManyDepartmentInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const DepartmentServicesCreateManyDepartmentInputEnvelopeObjectSchema = Schema;
