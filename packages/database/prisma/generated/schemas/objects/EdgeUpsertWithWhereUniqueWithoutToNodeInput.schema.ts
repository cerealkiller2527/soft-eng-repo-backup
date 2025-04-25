import { z } from 'zod';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';
import { EdgeUpdateWithoutToNodeInputObjectSchema } from './EdgeUpdateWithoutToNodeInput.schema';
import { EdgeUncheckedUpdateWithoutToNodeInputObjectSchema } from './EdgeUncheckedUpdateWithoutToNodeInput.schema';
import { EdgeCreateWithoutToNodeInputObjectSchema } from './EdgeCreateWithoutToNodeInput.schema';
import { EdgeUncheckedCreateWithoutToNodeInputObjectSchema } from './EdgeUncheckedCreateWithoutToNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpsertWithWhereUniqueWithoutToNodeInput> = z
    .object({
        where: z.lazy(() => EdgeWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => EdgeUpdateWithoutToNodeInputObjectSchema),
            z.lazy(() => EdgeUncheckedUpdateWithoutToNodeInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => EdgeCreateWithoutToNodeInputObjectSchema),
            z.lazy(() => EdgeUncheckedCreateWithoutToNodeInputObjectSchema),
        ]),
    })
    .strict();

export const EdgeUpsertWithWhereUniqueWithoutToNodeInputObjectSchema = Schema;
