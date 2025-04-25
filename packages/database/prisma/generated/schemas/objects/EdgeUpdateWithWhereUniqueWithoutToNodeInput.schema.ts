import { z } from 'zod';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';
import { EdgeUpdateWithoutToNodeInputObjectSchema } from './EdgeUpdateWithoutToNodeInput.schema';
import { EdgeUncheckedUpdateWithoutToNodeInputObjectSchema } from './EdgeUncheckedUpdateWithoutToNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpdateWithWhereUniqueWithoutToNodeInput> = z
    .object({
        where: z.lazy(() => EdgeWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => EdgeUpdateWithoutToNodeInputObjectSchema),
            z.lazy(() => EdgeUncheckedUpdateWithoutToNodeInputObjectSchema),
        ]),
    })
    .strict();

export const EdgeUpdateWithWhereUniqueWithoutToNodeInputObjectSchema = Schema;
