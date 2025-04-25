import { z } from 'zod';
import { ServiceRequestCreateNestedOneWithoutLanguageInputObjectSchema } from './ServiceRequestCreateNestedOneWithoutLanguageInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageCreateInput> = z
    .object({
        location: z.string(),
        language: z.string(),
        startTime: z.coerce.date(),
        endTime: z.coerce.date(),
        serviceRequest: z.lazy(() => ServiceRequestCreateNestedOneWithoutLanguageInputObjectSchema),
    })
    .strict();

export const LanguageCreateInputObjectSchema = Schema;
