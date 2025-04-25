import { z } from 'zod';
import { ServiceRequestCreateNestedOneWithoutAudioVisualInputObjectSchema } from './ServiceRequestCreateNestedOneWithoutAudioVisualInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualCreateInput> = z
    .object({
        location: z.string(),
        deadline: z.coerce.date(),
        audiovisualType: z.string(),
        serviceRequest: z.lazy(
            () => ServiceRequestCreateNestedOneWithoutAudioVisualInputObjectSchema
        ),
    })
    .strict();

export const AudioVisualCreateInputObjectSchema = Schema;
