import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestUpdateWithoutAssignedToInputObjectSchema } from './ServiceRequestUpdateWithoutAssignedToInput.schema';
import { ServiceRequestUncheckedUpdateWithoutAssignedToInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutAssignedToInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInput> = z
    .object({
        where: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => ServiceRequestUpdateWithoutAssignedToInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedUpdateWithoutAssignedToInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInputObjectSchema = Schema;
