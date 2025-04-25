import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { EnumnodeTypeFieldUpdateOperationsInputObjectSchema } from './EnumnodeTypeFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { EdgeUpdateManyWithoutToNodeNestedInputObjectSchema } from './EdgeUpdateManyWithoutToNodeNestedInput.schema';
import { LocationUpdateManyWithoutNodeNestedInputObjectSchema } from './LocationUpdateManyWithoutNodeNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUpdateWithoutFromEdgeInput> = z
    .object({
        type: z
            .union([
                z.lazy(() => nodeTypeSchema),
                z.lazy(() => EnumnodeTypeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        description: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        lat: z
            .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        long: z
            .union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        toEdge: z.lazy(() => EdgeUpdateManyWithoutToNodeNestedInputObjectSchema).optional(),
        Location: z.lazy(() => LocationUpdateManyWithoutNodeNestedInputObjectSchema).optional(),
    })
    .strict();

export const NodeUpdateWithoutFromEdgeInputObjectSchema = Schema;
