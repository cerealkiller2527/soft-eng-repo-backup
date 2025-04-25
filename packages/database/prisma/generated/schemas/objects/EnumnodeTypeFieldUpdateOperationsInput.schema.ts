import { z } from 'zod';
import { nodeTypeSchema } from '../enums/nodeType.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EnumnodeTypeFieldUpdateOperationsInput> = z
    .object({
        set: z.lazy(() => nodeTypeSchema).optional(),
    })
    .strict();

export const EnumnodeTypeFieldUpdateOperationsInputObjectSchema = Schema;
