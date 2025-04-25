import { z } from 'zod';
import { ServiceRequestCreateNestedOneWithoutSecurityInputObjectSchema } from './ServiceRequestCreateNestedOneWithoutSecurityInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityCreateInput> = z
    .object({
        location: z.string(),
        serviceRequest: z.lazy(() => ServiceRequestCreateNestedOneWithoutSecurityInputObjectSchema),
    })
    .strict();

export const SecurityCreateInputObjectSchema = Schema;
