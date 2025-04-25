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
import { EmployeeRelationFilterObjectSchema } from './EmployeeRelationFilter.schema';
import { EmployeeWhereInputObjectSchema } from './EmployeeWhereInput.schema';
import { AudioVisualRelationFilterObjectSchema } from './AudioVisualRelationFilter.schema';
import { AudioVisualWhereInputObjectSchema } from './AudioVisualWhereInput.schema';
import { ExternalTransportationRelationFilterObjectSchema } from './ExternalTransportationRelationFilter.schema';
import { ExternalTransportationWhereInputObjectSchema } from './ExternalTransportationWhereInput.schema';
import { EquipmentDeliveryRelationFilterObjectSchema } from './EquipmentDeliveryRelationFilter.schema';
import { EquipmentDeliveryWhereInputObjectSchema } from './EquipmentDeliveryWhereInput.schema';
import { LanguageRelationFilterObjectSchema } from './LanguageRelationFilter.schema';
import { LanguageWhereInputObjectSchema } from './LanguageWhereInput.schema';
import { SecurityRelationFilterObjectSchema } from './SecurityRelationFilter.schema';
import { SecurityWhereInputObjectSchema } from './SecurityWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ServiceRequestWhereInputObjectSchema),
                z.lazy(() => ServiceRequestWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ServiceRequestWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ServiceRequestWhereInputObjectSchema),
                z.lazy(() => ServiceRequestWhereInputObjectSchema).array(),
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
        assignedTo: z
            .union([
                z.lazy(() => EmployeeRelationFilterObjectSchema),
                z.lazy(() => EmployeeWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
        audioVisual: z
            .union([
                z.lazy(() => AudioVisualRelationFilterObjectSchema),
                z.lazy(() => AudioVisualWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
        externalTransportation: z
            .union([
                z.lazy(() => ExternalTransportationRelationFilterObjectSchema),
                z.lazy(() => ExternalTransportationWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
        equipmentDelivery: z
            .union([
                z.lazy(() => EquipmentDeliveryRelationFilterObjectSchema),
                z.lazy(() => EquipmentDeliveryWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
        language: z
            .union([
                z.lazy(() => LanguageRelationFilterObjectSchema),
                z.lazy(() => LanguageWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
        security: z
            .union([
                z.lazy(() => SecurityRelationFilterObjectSchema),
                z.lazy(() => SecurityWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
    })
    .strict();

export const ServiceRequestWhereInputObjectSchema = Schema;
