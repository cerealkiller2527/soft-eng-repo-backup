import { z } from 'zod';
import { NodeUpdateWithoutToEdgeInputObjectSchema } from './NodeUpdateWithoutToEdgeInput.schema';
import { NodeUncheckedUpdateWithoutToEdgeInputObjectSchema } from './NodeUncheckedUpdateWithoutToEdgeInput.schema';
import { NodeCreateWithoutToEdgeInputObjectSchema } from './NodeCreateWithoutToEdgeInput.schema';
import { NodeUncheckedCreateWithoutToEdgeInputObjectSchema } from './NodeUncheckedCreateWithoutToEdgeInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUpsertWithoutToEdgeInput> = z
    .object({
        update: z.union([
            z.lazy(() => NodeUpdateWithoutToEdgeInputObjectSchema),
            z.lazy(() => NodeUncheckedUpdateWithoutToEdgeInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => NodeCreateWithoutToEdgeInputObjectSchema),
            z.lazy(() => NodeUncheckedCreateWithoutToEdgeInputObjectSchema),
        ]),
    })
    .strict();

export const NodeUpsertWithoutToEdgeInputObjectSchema = Schema;
