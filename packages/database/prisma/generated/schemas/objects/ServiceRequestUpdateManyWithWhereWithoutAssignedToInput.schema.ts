import { z } from 'zod';
import { ServiceRequestScalarWhereInputObjectSchema } from './ServiceRequestScalarWhereInput.schema';
import { ServiceRequestUpdateManyMutationInputObjectSchema } from './ServiceRequestUpdateManyMutationInput.schema';
import { ServiceRequestUncheckedUpdateManyWithoutServiceRequestInputObjectSchema } from './ServiceRequestUncheckedUpdateManyWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpdateManyWithWhereWithoutAssignedToInput> = z
    .object({
        where: z.lazy(() => ServiceRequestScalarWhereInputObjectSchema),
        data: z.union([
            z.lazy(() => ServiceRequestUpdateManyMutationInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedUpdateManyWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestUpdateManyWithWhereWithoutAssignedToInputObjectSchema = Schema;
