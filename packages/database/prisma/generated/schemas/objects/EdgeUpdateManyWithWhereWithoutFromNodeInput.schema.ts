import { z } from 'zod';
import { EdgeScalarWhereInputObjectSchema } from './EdgeScalarWhereInput.schema';
import { EdgeUpdateManyMutationInputObjectSchema } from './EdgeUpdateManyMutationInput.schema';
import { EdgeUncheckedUpdateManyWithoutFromEdgeInputObjectSchema } from './EdgeUncheckedUpdateManyWithoutFromEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EdgeUpdateManyWithWhereWithoutFromNodeInput> = z
    .object({
        where: z.lazy(() => EdgeScalarWhereInputObjectSchema),
        data: z.union([
            z.lazy(() => EdgeUpdateManyMutationInputObjectSchema),
            z.lazy(() => EdgeUncheckedUpdateManyWithoutFromEdgeInputObjectSchema),
        ]),
    })
    .strict();

export const EdgeUpdateManyWithWhereWithoutFromNodeInputObjectSchema = Schema;
