import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestUpdateWithoutAssignedToInputObjectSchema } from './ServiceRequestUpdateWithoutAssignedToInput.schema';
import { ServiceRequestUncheckedUpdateWithoutAssignedToInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutAssignedToInput.schema';
import { ServiceRequestCreateWithoutAssignedToInputObjectSchema } from './ServiceRequestCreateWithoutAssignedToInput.schema';
import { ServiceRequestUncheckedCreateWithoutAssignedToInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutAssignedToInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInput> = z
    .object({
        where: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => ServiceRequestUpdateWithoutAssignedToInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedUpdateWithoutAssignedToInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutAssignedToInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInputObjectSchema = Schema;
