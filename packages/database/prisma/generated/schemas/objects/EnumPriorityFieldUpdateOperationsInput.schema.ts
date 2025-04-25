import { z } from 'zod';
import { PrioritySchema } from '../enums/Priority.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EnumPriorityFieldUpdateOperationsInput> = z
    .object({
        set: z.lazy(() => PrioritySchema).optional(),
    })
    .strict();

export const EnumPriorityFieldUpdateOperationsInputObjectSchema = Schema;
