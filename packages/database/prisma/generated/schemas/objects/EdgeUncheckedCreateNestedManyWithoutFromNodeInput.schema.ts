import { z } from 'zod';
import { EdgeCreateWithoutFromNodeInputObjectSchema } from './EdgeCreateWithoutFromNodeInput.schema';
import { EdgeUncheckedCreateWithoutFromNodeInputObjectSchema } from './EdgeUncheckedCreateWithoutFromNodeInput.schema';
import { EdgeCreateOrConnectWithoutFromNodeInputObjectSchema } from './EdgeCreateOrConnectWithoutFromNodeInput.schema';
import { EdgeCreateManyFromNodeInputEnvelopeObjectSchema } from './EdgeCreateManyFromNodeInputEnvelope.schema';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUncheckedCreateNestedManyWithoutFromNodeInput> = z
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
        createMany: z.lazy(() => EdgeCreateManyFromNodeInputEnvelopeObjectSchema).optional(),
        connect: z
            .union([
                z.lazy(() => EdgeWhereUniqueInputObjectSchema),
                z.lazy(() => EdgeWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const EdgeUncheckedCreateNestedManyWithoutFromNodeInputObjectSchema = Schema;
