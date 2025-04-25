import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeUpdatecanServiceInput> = z
    .object({
        set: z
            .lazy(() => RequestTypeSchema)
            .array()
            .optional(),
        push: z
            .union([z.lazy(() => RequestTypeSchema), z.lazy(() => RequestTypeSchema).array()])
            .optional(),
    })
    .strict();

export const EmployeeUpdatecanServiceInputObjectSchema = Schema;
