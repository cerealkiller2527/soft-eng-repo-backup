import { z } from 'zod';
import { ServiceRequestCreateWithoutAssignedToInputObjectSchema } from './ServiceRequestCreateWithoutAssignedToInput.schema';
import { ServiceRequestUncheckedCreateWithoutAssignedToInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutAssignedToInput.schema';
import { ServiceRequestCreateOrConnectWithoutAssignedToInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutAssignedToInput.schema';
import { ServiceRequestCreateManyAssignedToInputEnvelopeObjectSchema } from './ServiceRequestCreateManyAssignedToInputEnvelope.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateNestedManyWithoutAssignedToInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => ServiceRequestCreateWithoutAssignedToInputObjectSchema),
                z.lazy(() => ServiceRequestCreateWithoutAssignedToInputObjectSchema).array(),
                z.lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputObjectSchema),
                z
                    .lazy(() => ServiceRequestUncheckedCreateWithoutAssignedToInputObjectSchema)
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputObjectSchema),
                z
                    .lazy(() => ServiceRequestCreateOrConnectWithoutAssignedToInputObjectSchema)
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => ServiceRequestCreateManyAssignedToInputEnvelopeObjectSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const ServiceRequestCreateNestedManyWithoutAssignedToInputObjectSchema = Schema;
