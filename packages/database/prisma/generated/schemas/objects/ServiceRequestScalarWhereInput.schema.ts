import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { EnumRequestTypeFilterObjectSchema } from './EnumRequestTypeFilter.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumStatusFilterObjectSchema } from './EnumStatusFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumPriorityFilterObjectSchema } from './EnumPriorityFilter.schema';
import { PrioritySchema } from '../enums/Priority.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestScalarWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ServiceRequestScalarWhereInputObjectSchema),
                z.lazy(() => ServiceRequestScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ServiceRequestScalarWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ServiceRequestScalarWhereInputObjectSchema),
                z.lazy(() => ServiceRequestScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
        type: z
            .union([
                z.lazy(() => EnumRequestTypeFilterObjectSchema),
                z.lazy(() => RequestTypeSchema),
            ])
            .optional(),
        dateCreated: z
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
            .optional(),
        dateUpdated: z
            .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()])
            .optional()
            .nullable(),
        status: z
            .union([z.lazy(() => EnumStatusFilterObjectSchema), z.lazy(() => StatusSchema)])
            .optional(),
        description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        assignedEmployeeID: z
            .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
        fromEmployee: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
        priority: z
            .union([z.lazy(() => EnumPriorityFilterObjectSchema), z.lazy(() => PrioritySchema)])
            .optional(),
    })
    .strict();

export const ServiceRequestScalarWhereInputObjectSchema = Schema;
