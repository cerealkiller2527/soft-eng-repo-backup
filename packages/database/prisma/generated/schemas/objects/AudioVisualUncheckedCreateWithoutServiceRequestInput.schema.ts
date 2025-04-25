import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualUncheckedCreateWithoutServiceRequestInput> = z
    .object({
        location: z.string(),
        deadline: z.coerce.date(),
        audiovisualType: z.string(),
    })
    .strict();

export const AudioVisualUncheckedCreateWithoutServiceRequestInputObjectSchema = Schema;
