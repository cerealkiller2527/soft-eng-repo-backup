import { z } from 'zod';
import { EdgeCreateWithoutToNodeInputObjectSchema } from './EdgeCreateWithoutToNodeInput.schema';
import { EdgeUncheckedCreateWithoutToNodeInputObjectSchema } from './EdgeUncheckedCreateWithoutToNodeInput.schema';
import { EdgeCreateOrConnectWithoutToNodeInputObjectSchema } from './EdgeCreateOrConnectWithoutToNodeInput.schema';
import { EdgeUpsertWithWhereUniqueWithoutToNodeInputObjectSchema } from './EdgeUpsertWithWhereUniqueWithoutToNodeInput.schema';
import { EdgeCreateManyToNodeInputEnvelopeObjectSchema } from './EdgeCreateManyToNodeInputEnvelope.schema';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';
import { EdgeUpdateWithWhereUniqueWithoutToNodeInputObjectSchema } from './EdgeUpdateWithWhereUniqueWithoutToNodeInput.schema';
import { EdgeUpdateManyWithWhereWithoutToNodeInputObjectSchema } from './EdgeUpdateManyWithWhereWithoutToNodeInput.schema';
import { EdgeScalarWhereInputObjectSchema } from './EdgeScalarWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpdateManyWithoutToNodeNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => EdgeCreateWithoutToNodeInputObjectSchema),
                z.lazy(() => EdgeCreateWithoutToNodeInputObjectSchema).array(),
                z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputObjectSchema),
                z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputObjectSchema).array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputObjectSchema),
                z.lazy(() => EdgeCreateOrConnectWithoutToNodeInputObjectSchema).array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(() => EdgeUpsertWithWhereUniqueWithoutToNodeInputObjectSchema),
                z.lazy(() => EdgeUpsertWithWhereUniqueWithoutToNodeInputObjectSchema).array(),
            ])
            .optional(),
        createMany: z.lazy(() => EdgeCreateManyToNodeInputEnvelopeObjectSchema).optional(),
        set: z
            .union([
                z.lazy(() => EdgeWhereUniqueInputObjectSchema),
                z.lazy(() => EdgeWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => EdgeWhereUniqueInputObjectSchema),
                z.lazy(() => EdgeWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => EdgeWhereUniqueInputObjectSchema),
                z.lazy(() => EdgeWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => EdgeWhereUniqueInputObjectSchema),
                z.lazy(() => EdgeWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(() => EdgeUpdateWithWhereUniqueWithoutToNodeInputObjectSchema),
                z.lazy(() => EdgeUpdateWithWhereUniqueWithoutToNodeInputObjectSchema).array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(() => EdgeUpdateManyWithWhereWithoutToNodeInputObjectSchema),
                z.lazy(() => EdgeUpdateManyWithWhereWithoutToNodeInputObjectSchema).array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => EdgeScalarWhereInputObjectSchema),
                z.lazy(() => EdgeScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const EdgeUpdateManyWithoutToNodeNestedInputObjectSchema = Schema;
