import { z } from 'zod';
import { ServiceRequestUpdateWithoutLanguageInputObjectSchema } from './ServiceRequestUpdateWithoutLanguageInput.schema';
import { ServiceRequestUncheckedUpdateWithoutLanguageInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutLanguageInput.schema';
import { ServiceRequestCreateWithoutLanguageInputObjectSchema } from './ServiceRequestCreateWithoutLanguageInput.schema';
import { ServiceRequestUncheckedCreateWithoutLanguageInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutLanguageInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpsertWithoutLanguageInput> = z
    .object({
        update: z.union([
            z.lazy(() => ServiceRequestUpdateWithoutLanguageInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedUpdateWithoutLanguageInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutLanguageInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutLanguageInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestUpsertWithoutLanguageInputObjectSchema = Schema;
