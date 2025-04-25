import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { EnumRequestTypeWithAggregatesFilterObjectSchema } from './EnumRequestTypeWithAggregatesFilter.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { EnumStatusWithAggregatesFilterObjectSchema } from './EnumStatusWithAggregatesFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { EnumPriorityWithAggregatesFilterObjectSchema } from './EnumPriorityWithAggregatesFilter.schema';
import { PrioritySchema } from '../enums/Priority.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ServiceRequestScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => ServiceRequestScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ServiceRequestScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ServiceRequestScalarWhereWithAggregatesInputObjectSchema),
                z.lazy(() => ServiceRequestScalarWhereWithAggregatesInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
        type: z
            .union([
                z.lazy(() => EnumRequestTypeWithAggregatesFilterObjectSchema),
                z.lazy(() => RequestTypeSchema),
            ])
            .optional(),
        dateCreated: z
            .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()])
            .optional(),
        dateUpdated: z
            .union([
                z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
        status: z
            .union([
                z.lazy(() => EnumStatusWithAggregatesFilterObjectSchema),
                z.lazy(() => StatusSchema),
            ])
            .optional(),
        description: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        assignedEmployeeID: z
            .union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
        fromEmployee: z
            .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
            .optional(),
        priority: z
            .union([
                z.lazy(() => EnumPriorityWithAggregatesFilterObjectSchema),
                z.lazy(() => PrioritySchema),
            ])
            .optional(),
    })
    .strict();

export const ServiceRequestScalarWhereWithAggregatesInputObjectSchema = Schema;
