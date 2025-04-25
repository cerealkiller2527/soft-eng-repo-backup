import { z } from 'zod';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';
import { EdgeUpdateWithoutFromNodeInputObjectSchema } from './EdgeUpdateWithoutFromNodeInput.schema';
import { EdgeUncheckedUpdateWithoutFromNodeInputObjectSchema } from './EdgeUncheckedUpdateWithoutFromNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpdateWithWhereUniqueWithoutFromNodeInput> = z
    .object({
        where: z.lazy(() => EdgeWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => EdgeUpdateWithoutFromNodeInputObjectSchema),
            z.lazy(() => EdgeUncheckedUpdateWithoutFromNodeInputObjectSchema),
        ]),
    })
    .strict();

export const EdgeUpdateWithWhereUniqueWithoutFromNodeInputObjectSchema = Schema;
