import { z } from 'zod';
import { ServiceRequestCreateWithoutSecurityInputObjectSchema } from './ServiceRequestCreateWithoutSecurityInput.schema';
import { ServiceRequestUncheckedCreateWithoutSecurityInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutSecurityInput.schema';
import { ServiceRequestCreateOrConnectWithoutSecurityInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutSecurityInput.schema';
import { ServiceRequestUpsertWithoutSecurityInputObjectSchema } from './ServiceRequestUpsertWithoutSecurityInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestUpdateWithoutSecurityInputObjectSchema } from './ServiceRequestUpdateWithoutSecurityInput.schema';
import { ServiceRequestUncheckedUpdateWithoutSecurityInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutSecurityInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutSecurityNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => ServiceRequestCreateWithoutSecurityInputObjectSchema),
                z.lazy(() => ServiceRequestUncheckedCreateWithoutSecurityInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => ServiceRequestCreateOrConnectWithoutSecurityInputObjectSchema)
            .optional(),
        upsert: z.lazy(() => ServiceRequestUpsertWithoutSecurityInputObjectSchema).optional(),
        connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => ServiceRequestUpdateWithoutSecurityInputObjectSchema),
                z.lazy(() => ServiceRequestUncheckedUpdateWithoutSecurityInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const ServiceRequestUpdateOneRequiredWithoutSecurityNestedInputObjectSchema = Schema;
