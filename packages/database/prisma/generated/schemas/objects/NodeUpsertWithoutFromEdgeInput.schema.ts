import { z } from 'zod';
import { NodeUpdateWithoutFromEdgeInputObjectSchema } from './NodeUpdateWithoutFromEdgeInput.schema';
import { NodeUncheckedUpdateWithoutFromEdgeInputObjectSchema } from './NodeUncheckedUpdateWithoutFromEdgeInput.schema';
import { NodeCreateWithoutFromEdgeInputObjectSchema } from './NodeCreateWithoutFromEdgeInput.schema';
import { NodeUncheckedCreateWithoutFromEdgeInputObjectSchema } from './NodeUncheckedCreateWithoutFromEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUpsertWithoutFromEdgeInput> = z
    .object({
        update: z.union([
            z.lazy(() => NodeUpdateWithoutFromEdgeInputObjectSchema),
            z.lazy(() => NodeUncheckedUpdateWithoutFromEdgeInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => NodeCreateWithoutFromEdgeInputObjectSchema),
            z.lazy(() => NodeUncheckedCreateWithoutFromEdgeInputObjectSchema),
        ]),
    })
    .strict();

export const NodeUpsertWithoutFromEdgeInputObjectSchema = Schema;
