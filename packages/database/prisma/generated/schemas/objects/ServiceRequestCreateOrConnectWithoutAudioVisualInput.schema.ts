import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestCreateWithoutAudioVisualInputObjectSchema } from './ServiceRequestCreateWithoutAudioVisualInput.schema';
import { ServiceRequestUncheckedCreateWithoutAudioVisualInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutAudioVisualInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutAudioVisualInput> = z
    .object({
        where: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutAudioVisualInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutAudioVisualInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestCreateOrConnectWithoutAudioVisualInputObjectSchema = Schema;
