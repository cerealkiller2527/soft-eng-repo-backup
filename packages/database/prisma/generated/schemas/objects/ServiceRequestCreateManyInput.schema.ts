import { z } from 'zod';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { StatusSchema } from '../enums/Status.schema';
import { PrioritySchema } from '../enums/Priority.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateManyInput> = z
    .object({
        id: z.number().optional(),
        type: z.lazy(() => RequestTypeSchema),
        dateCreated: z.coerce.date().optional(),
        dateUpdated: z.coerce.date().optional().nullable(),
        status: z.lazy(() => StatusSchema),
        description: z.string(),
        assignedEmployeeID: z.number().optional().nullable(),
        fromEmployee: z.string(),
        priority: z.lazy(() => PrioritySchema),
    })
    .strict();

export const ServiceRequestCreateManyInputObjectSchema = Schema;
