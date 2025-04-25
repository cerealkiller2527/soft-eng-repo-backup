import { z } from 'zod';
import { ServiceRequestCreateWithoutSecurityInputObjectSchema } from './ServiceRequestCreateWithoutSecurityInput.schema';
import { ServiceRequestUncheckedCreateWithoutSecurityInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutSecurityInput.schema';
import { ServiceRequestCreateOrConnectWithoutSecurityInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutSecurityInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutSecurityInput> = z
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
        connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const ServiceRequestCreateNestedOneWithoutSecurityInputObjectSchema = Schema;
