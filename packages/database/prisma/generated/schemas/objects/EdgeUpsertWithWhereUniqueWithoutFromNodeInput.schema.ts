import { z } from 'zod';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';
import { EdgeUpdateWithoutFromNodeInputObjectSchema } from './EdgeUpdateWithoutFromNodeInput.schema';
import { EdgeUncheckedUpdateWithoutFromNodeInputObjectSchema } from './EdgeUncheckedUpdateWithoutFromNodeInput.schema';
import { EdgeCreateWithoutFromNodeInputObjectSchema } from './EdgeCreateWithoutFromNodeInput.schema';
import { EdgeUncheckedCreateWithoutFromNodeInputObjectSchema } from './EdgeUncheckedCreateWithoutFromNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpsertWithWhereUniqueWithoutFromNodeInput> = z
    .object({
        where: z.lazy(() => EdgeWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => EdgeUpdateWithoutFromNodeInputObjectSchema),
            z.lazy(() => EdgeUncheckedUpdateWithoutFromNodeInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => EdgeCreateWithoutFromNodeInputObjectSchema),
            z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputObjectSchema),
        ]),
    })
    .strict();

export const EdgeUpsertWithWhereUniqueWithoutFromNodeInputObjectSchema = Schema;
