import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EnumRequestTypeFieldUpdateOperationsInputObjectSchema } from './EnumRequestTypeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { StatusSchema } from '../enums/Status.schema';
import { EnumStatusFieldUpdateOperationsInputObjectSchema } from './EnumStatusFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { EnumPriorityFieldUpdateOperationsInputObjectSchema } from './EnumPriorityFieldUpdateOperationsInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUncheckedUpdateManyWithoutServiceRequestInput> = z
    .object({
        id: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        type: z
            .union([
                z.lazy(() => RequestTypeSchema),
                z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        dateCreated: z
            .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        dateUpdated: z
            .union([
                z.coerce.date(),
                z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional()
            .nullable(),
        status: z
            .union([
                z.lazy(() => StatusSchema),
                z.lazy(() => EnumStatusFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        description: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        fromEmployee: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        priority: z
            .union([
                z.lazy(() => PrioritySchema),
                z.lazy(() => EnumPriorityFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const ServiceRequestUncheckedUpdateManyWithoutServiceRequestInputObjectSchema = Schema;
