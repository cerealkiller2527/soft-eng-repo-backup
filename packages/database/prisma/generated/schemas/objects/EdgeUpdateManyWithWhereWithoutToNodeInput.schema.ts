import { z } from 'zod';
import { EdgeScalarWhereInputObjectSchema } from './EdgeScalarWhereInput.schema';
import { EdgeUpdateManyMutationInputObjectSchema } from './EdgeUpdateManyMutationInput.schema';
import { EdgeUncheckedUpdateManyWithoutToEdgeInputObjectSchema } from './EdgeUncheckedUpdateManyWithoutToEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpdateManyWithWhereWithoutToNodeInput> = z
    .object({
        where: z.lazy(() => EdgeScalarWhereInputObjectSchema),
        data: z.union([
            z.lazy(() => EdgeUpdateManyMutationInputObjectSchema),
            z.lazy(() => EdgeUncheckedUpdateManyWithoutToEdgeInputObjectSchema),
        ]),
    })
    .strict();

export const EdgeUpdateManyWithWhereWithoutToNodeInputObjectSchema = Schema;
