import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeCreatecanServiceInput> = z
    .object({
        set: z.lazy(() => RequestTypeSchema).array(),
    })
    .strict();

export const EmployeeCreatecanServiceInputObjectSchema = Schema;
