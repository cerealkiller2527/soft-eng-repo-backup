import { z } from 'zod';
import { ServiceRequestCreateWithoutAudioVisualInputObjectSchema } from './ServiceRequestCreateWithoutAudioVisualInput.schema';
import { ServiceRequestUncheckedCreateWithoutAudioVisualInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutAudioVisualInput.schema';
import { ServiceRequestCreateOrConnectWithoutAudioVisualInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutAudioVisualInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutAudioVisualInput> = z
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
        connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const ServiceRequestCreateNestedOneWithoutAudioVisualInputObjectSchema = Schema;
