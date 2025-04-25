import { z } from 'zod';
import { EdgeCreateWithoutFromNodeInputObjectSchema } from './EdgeCreateWithoutFromNodeInput.schema';
import { EdgeUncheckedCreateWithoutFromNodeInputObjectSchema } from './EdgeUncheckedCreateWithoutFromNodeInput.schema';
import { EdgeCreateOrConnectWithoutFromNodeInputObjectSchema } from './EdgeCreateOrConnectWithoutFromNodeInput.schema';
import { EdgeUpsertWithWhereUniqueWithoutFromNodeInputObjectSchema } from './EdgeUpsertWithWhereUniqueWithoutFromNodeInput.schema';
import { EdgeCreateManyFromNodeInputEnvelopeObjectSchema } from './EdgeCreateManyFromNodeInputEnvelope.schema';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';
import { EdgeUpdateWithWhereUniqueWithoutFromNodeInputObjectSchema } from './EdgeUpdateWithWhereUniqueWithoutFromNodeInput.schema';
import { EdgeUpdateManyWithWhereWithoutFromNodeInputObjectSchema } from './EdgeUpdateManyWithWhereWithoutFromNodeInput.schema';
import { EdgeScalarWhereInputObjectSchema } from './EdgeScalarWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUncheckedUpdateManyWithoutFromNodeNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => EdgeCreateWithoutFromNodeInputObjectSchema),
                z.lazy(() => EdgeCreateWithoutFromNodeInputObjectSchema).array(),
                z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputObjectSchema),
                z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputObjectSchema).array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputObjectSchema),
                z.lazy(() => EdgeCreateOrConnectWithoutFromNodeInputObjectSchema).array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(() => EdgeUpsertWithWhereUniqueWithoutFromNodeInputObjectSchema),
                z.lazy(() => EdgeUpsertWithWhereUniqueWithoutFromNodeInputObjectSchema).array(),
            ])
            .optional(),
        createMany: z.lazy(() => EdgeCreateManyFromNodeInputEnvelopeObjectSchema).optional(),
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
                z.lazy(() => EdgeUpdateWithWhereUniqueWithoutFromNodeInputObjectSchema),
                z.lazy(() => EdgeUpdateWithWhereUniqueWithoutFromNodeInputObjectSchema).array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(() => EdgeUpdateManyWithWhereWithoutFromNodeInputObjectSchema),
                z.lazy(() => EdgeUpdateManyWithWhereWithoutFromNodeInputObjectSchema).array(),
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

export const EdgeUncheckedUpdateManyWithoutFromNodeNestedInputObjectSchema = Schema;
