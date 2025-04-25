import { z } from 'zod';
import { ServiceRequestCreateWithoutAssignedToInputObjectSchema } from './ServiceRequestCreateWithoutAssignedToInput.schema';
import { ServiceRequestUncheckedCreateWithoutAssignedToInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutAssignedToInput.schema';
import { ServiceRequestCreateOrConnectWithoutAssignedToInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutAssignedToInput.schema';
import { ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInputObjectSchema } from './ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInput.schema';
import { ServiceRequestCreateManyAssignedToInputEnvelopeObjectSchema } from './ServiceRequestCreateManyAssignedToInputEnvelope.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInputObjectSchema } from './ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInput.schema';
import { ServiceRequestUpdateManyWithWhereWithoutAssignedToInputObjectSchema } from './ServiceRequestUpdateManyWithWhereWithoutAssignedToInput.schema';
import { ServiceRequestScalarWhereInputObjectSchema } from './ServiceRequestScalarWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpdateManyWithoutAssignedToNestedInput> = z
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
        upsert: z
            .union([
                z.lazy(() => ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInputObjectSchema),
                z
                    .lazy(
                        () => ServiceRequestUpsertWithWhereUniqueWithoutAssignedToInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => ServiceRequestCreateManyAssignedToInputEnvelopeObjectSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
                z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(() => ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInputObjectSchema),
                z
                    .lazy(
                        () => ServiceRequestUpdateWithWhereUniqueWithoutAssignedToInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(() => ServiceRequestUpdateManyWithWhereWithoutAssignedToInputObjectSchema),
                z
                    .lazy(() => ServiceRequestUpdateManyWithWhereWithoutAssignedToInputObjectSchema)
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => ServiceRequestScalarWhereInputObjectSchema),
                z.lazy(() => ServiceRequestScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const ServiceRequestUpdateManyWithoutAssignedToNestedInputObjectSchema = Schema;
