import { z } from 'zod';
import { EdgeWhereUniqueInputObjectSchema } from './EdgeWhereUniqueInput.schema';
import { EdgeCreateWithoutFromNodeInputObjectSchema } from './EdgeCreateWithoutFromNodeInput.schema';
import { EdgeUncheckedCreateWithoutFromNodeInputObjectSchema } from './EdgeUncheckedCreateWithoutFromNodeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeCreateOrConnectWithoutFromNodeInput> = z
    .object({
        where: z.lazy(() => EdgeWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => EdgeCreateWithoutFromNodeInputObjectSchema),
            z.lazy(() => EdgeUncheckedCreateWithoutFromNodeInputObjectSchema),
        ]),
    })
    .strict();

export const EdgeCreateOrConnectWithoutFromNodeInputObjectSchema = Schema;
