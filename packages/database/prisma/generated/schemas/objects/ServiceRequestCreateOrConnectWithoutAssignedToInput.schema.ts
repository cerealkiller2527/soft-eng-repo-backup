import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestCreateWithoutAssignedToInputObjectSchema } from './ServiceRequestCreateWithoutAssignedToInput.schema';
import { ServiceRequestUncheckedCreateWithoutAssignedToInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutAssignedToInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutAssignedToInput> = z
    .object({
        where: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutAssignedToInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestCreateOrConnectWithoutAssignedToInputObjectSchema = Schema;
