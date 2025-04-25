import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BuildingUpdateOneRequiredWithoutLocationNestedInputObjectSchema } from './BuildingUpdateOneRequiredWithoutLocationNestedInput.schema';
import { DepartmentUpdateOneWithoutLocationNestedInputObjectSchema } from './DepartmentUpdateOneWithoutLocationNestedInput.schema';
import { NodeUpdateOneWithoutLocationNestedInputObjectSchema } from './NodeUpdateOneWithoutLocationNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LocationUpdateInput> = z
    .object({
        floor: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        suite: z
            .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
            .optional()
            .nullable(),
        building: z
            .lazy(() => BuildingUpdateOneRequiredWithoutLocationNestedInputObjectSchema)
            .optional(),
        Department: z
            .lazy(() => DepartmentUpdateOneWithoutLocationNestedInputObjectSchema)
            .optional(),
        node: z.lazy(() => NodeUpdateOneWithoutLocationNestedInputObjectSchema).optional(),
    })
    .strict();

export const LocationUpdateInputObjectSchema = Schema;
