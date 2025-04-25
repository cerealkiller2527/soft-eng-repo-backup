import { z } from 'zod';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualUncheckedCreateInput> = z
    .object({
        id: z.number(),
        location: z.string(),
        deadline: z.coerce.date(),
        audiovisualType: z.string(),
    })
    .strict();

export const AudioVisualUncheckedCreateInputObjectSchema = Schema;
