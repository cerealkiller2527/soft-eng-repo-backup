import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateInput> = z
    .object({
        departmentID: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        serviceID: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
    })
    .strict();

export const DepartmentServicesUncheckedUpdateInputObjectSchema = Schema;
