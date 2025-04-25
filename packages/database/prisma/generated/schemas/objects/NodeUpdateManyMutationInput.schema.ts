import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';
import { EnumnodeTypeFieldUpdateOperationsInputObjectSchema } from './EnumnodeTypeFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.NodeUpdateManyMutationInput> = z
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
    })
    .strict();

export const NodeUpdateManyMutationInputObjectSchema = Schema;
