import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestCreateWithoutSecurityInputObjectSchema } from './ServiceRequestCreateWithoutSecurityInput.schema';
import { ServiceRequestUncheckedCreateWithoutSecurityInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutSecurityInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutSecurityInput> = z
    .object({
        where: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutSecurityInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutSecurityInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestCreateOrConnectWithoutSecurityInputObjectSchema = Schema;
