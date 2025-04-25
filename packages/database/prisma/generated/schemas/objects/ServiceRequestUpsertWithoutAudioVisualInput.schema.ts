import { z } from 'zod';
import { ServiceRequestUpdateWithoutAudioVisualInputObjectSchema } from './ServiceRequestUpdateWithoutAudioVisualInput.schema';
import { ServiceRequestUncheckedUpdateWithoutAudioVisualInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutAudioVisualInput.schema';
import { ServiceRequestCreateWithoutAudioVisualInputObjectSchema } from './ServiceRequestCreateWithoutAudioVisualInput.schema';
import { ServiceRequestUncheckedCreateWithoutAudioVisualInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutAudioVisualInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpsertWithoutAudioVisualInput> = z
    .object({
        update: z.union([
            z.lazy(() => ServiceRequestUpdateWithoutAudioVisualInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedUpdateWithoutAudioVisualInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutAudioVisualInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutAudioVisualInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestUpsertWithoutAudioVisualInputObjectSchema = Schema;
