import { z } from 'zod';
import { DepartmentServicesCreateManyServiceInputObjectSchema } from './DepartmentServicesCreateManyServiceInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateManyServiceInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => DepartmentServicesCreateManyServiceInputObjectSchema),
            z.lazy(() => DepartmentServicesCreateManyServiceInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const DepartmentServicesCreateManyServiceInputEnvelopeObjectSchema = Schema;
