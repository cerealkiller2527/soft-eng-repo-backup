import { z } from 'zod';
import { ServiceRequestCreateManyAssignedToInputObjectSchema } from './ServiceRequestCreateManyAssignedToInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateManyAssignedToInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => ServiceRequestCreateManyAssignedToInputObjectSchema),
            z.lazy(() => ServiceRequestCreateManyAssignedToInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ServiceRequestCreateManyAssignedToInputEnvelopeObjectSchema = Schema;
