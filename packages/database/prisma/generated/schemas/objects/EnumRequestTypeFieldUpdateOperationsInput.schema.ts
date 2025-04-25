import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EnumRequestTypeFieldUpdateOperationsInput> = z
    .object({
        set: z.lazy(() => RequestTypeSchema).optional(),
    })
    .strict();

export const EnumRequestTypeFieldUpdateOperationsInputObjectSchema = Schema;
