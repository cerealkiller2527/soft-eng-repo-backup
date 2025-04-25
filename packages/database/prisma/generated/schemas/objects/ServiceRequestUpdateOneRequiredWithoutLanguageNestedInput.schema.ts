import { z } from 'zod';
import { ServiceRequestCreateWithoutLanguageInputObjectSchema } from './ServiceRequestCreateWithoutLanguageInput.schema';
import { ServiceRequestUncheckedCreateWithoutLanguageInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutLanguageInput.schema';
import { ServiceRequestCreateOrConnectWithoutLanguageInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutLanguageInput.schema';
import { ServiceRequestUpsertWithoutLanguageInputObjectSchema } from './ServiceRequestUpsertWithoutLanguageInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestUpdateWithoutLanguageInputObjectSchema } from './ServiceRequestUpdateWithoutLanguageInput.schema';
import { ServiceRequestUncheckedUpdateWithoutLanguageInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutLanguageInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutLanguageNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => ServiceRequestCreateWithoutLanguageInputObjectSchema),
                z.lazy(() => ServiceRequestUncheckedCreateWithoutLanguageInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => ServiceRequestCreateOrConnectWithoutLanguageInputObjectSchema)
            .optional(),
        upsert: z.lazy(() => ServiceRequestUpsertWithoutLanguageInputObjectSchema).optional(),
        connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => ServiceRequestUpdateWithoutLanguageInputObjectSchema),
                z.lazy(() => ServiceRequestUncheckedUpdateWithoutLanguageInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const ServiceRequestUpdateOneRequiredWithoutLanguageNestedInputObjectSchema = Schema;
