import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { LocationUncheckedUpdateManyWithoutBuildingNestedInputObjectSchema } from './LocationUncheckedUpdateManyWithoutBuildingNestedInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.BuildingUncheckedUpdateInput> = z
    .object({
        id: z
            .union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        name: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        address: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        phoneNumber: z
            .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
            .optional(),
        Location: z
            .lazy(() => LocationUncheckedUpdateManyWithoutBuildingNestedInputObjectSchema)
            .optional(),
    })
    .strict();

export const BuildingUncheckedUpdateInputObjectSchema = Schema;
