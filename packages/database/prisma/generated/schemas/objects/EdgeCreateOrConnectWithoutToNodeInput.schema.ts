import { z } from 'zod';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';
import { EdgeCreateWithoutToNodeInputObjectSchema } from './EdgeCreateWithoutToNodeInput.schema';
import { EdgeUncheckedCreateWithoutToNodeInputObjectSchema } from './EdgeUncheckedCreateWithoutToNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCreateOrConnectWithoutToNodeInput> = z
    .object({
        where: z.lazy(() => EdgeWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => EdgeCreateWithoutToNodeInputObjectSchema),
            z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputObjectSchema),
        ]),
    })
    .strict();

export const EdgeCreateOrConnectWithoutToNodeInputObjectSchema = Schema;
