import { z } from 'zod';
import { ServiceRequestUpdateWithoutSecurityInputObjectSchema } from './ServiceRequestUpdateWithoutSecurityInput.schema';
import { ServiceRequestUncheckedUpdateWithoutSecurityInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutSecurityInput.schema';
import { ServiceRequestCreateWithoutSecurityInputObjectSchema } from './ServiceRequestCreateWithoutSecurityInput.schema';
import { ServiceRequestUncheckedCreateWithoutSecurityInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutSecurityInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpsertWithoutSecurityInput> = z
    .object({
        update: z.union([
            z.lazy(() => ServiceRequestUpdateWithoutSecurityInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedUpdateWithoutSecurityInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutSecurityInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutSecurityInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestUpsertWithoutSecurityInputObjectSchema = Schema;
