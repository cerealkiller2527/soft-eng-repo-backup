import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { EnumnodeTypeFieldUpdateOperationsInputObjectSchema } from './EnumnodeTypeFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { EdgeUncheckedUpdateManyWithoutFromNodeNestedInputObjectSchema } from './EdgeUncheckedUpdateManyWithoutFromNodeNestedInput.schema';
import { EdgeUncheckedUpdateManyWithoutToNodeNestedInputObjectSchema } from './EdgeUncheckedUpdateManyWithoutToNodeNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutLocationInput> = z
    .object({
        id: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
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
        fromEdge: z
            .lazy(() => EdgeUncheckedUpdateManyWithoutFromNodeNestedInputObjectSchema)
            .optional(),
        toEdge: z
            .lazy(() => EdgeUncheckedUpdateManyWithoutToNodeNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const NodeUncheckedUpdateWithoutLocationInputObjectSchema = Schema;
