import { z } from 'zod';
import { ServiceRequestCreateWithoutAudioVisualInputObjectSchema } from './ServiceRequestCreateWithoutAudioVisualInput.schema';
import { ServiceRequestUncheckedCreateWithoutAudioVisualInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutAudioVisualInput.schema';
import { ServiceRequestCreateOrConnectWithoutAudioVisualInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutAudioVisualInput.schema';
import { ServiceRequestUpsertWithoutAudioVisualInputObjectSchema } from './ServiceRequestUpsertWithoutAudioVisualInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestUpdateWithoutAudioVisualInputObjectSchema } from './ServiceRequestUpdateWithoutAudioVisualInput.schema';
import { ServiceRequestUncheckedUpdateWithoutAudioVisualInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutAudioVisualInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutAudioVisualNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => ServiceRequestCreateWithoutAudioVisualInputObjectSchema),
                z.lazy(() => ServiceRequestUncheckedCreateWithoutAudioVisualInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => ServiceRequestCreateOrConnectWithoutAudioVisualInputObjectSchema)
            .optional(),
        upsert: z.lazy(() => ServiceRequestUpsertWithoutAudioVisualInputObjectSchema).optional(),
        connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => ServiceRequestUpdateWithoutAudioVisualInputObjectSchema),
                z.lazy(() => ServiceRequestUncheckedUpdateWithoutAudioVisualInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const ServiceRequestUpdateOneRequiredWithoutAudioVisualNestedInputObjectSchema = Schema;
