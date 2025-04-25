import { z } from 'zod';
import { EdgeCreateWithoutToNodeInputObjectSchema } from './EdgeCreateWithoutToNodeInput.schema';
import { EdgeUncheckedCreateWithoutToNodeInputObjectSchema } from './EdgeUncheckedCreateWithoutToNodeInput.schema';
import { EdgeCreateOrConnectWithoutToNodeInputObjectSchema } from './EdgeCreateOrConnectWithoutToNodeInput.schema';
import { EdgeCreateManyToNodeInputEnvelopeObjectSchema } from './EdgeCreateManyToNodeInputEnvelope.schema';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUncheckedCreateNestedManyWithoutToNodeInput> = z
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
        createMany: z.lazy(() => EdgeCreateManyToNodeInputEnvelopeObjectSchema).optional(),
        connect: z
            .union([
                z.lazy(() => EdgeWhereUniqueInputObjectSchema),
                z.lazy(() => EdgeWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const EdgeUncheckedCreateNestedManyWithoutToNodeInputObjectSchema = Schema;
