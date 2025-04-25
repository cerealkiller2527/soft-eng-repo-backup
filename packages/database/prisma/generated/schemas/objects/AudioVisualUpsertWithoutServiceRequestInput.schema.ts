import { z } from 'zod';
import { AudioVisualUpdateWithoutServiceRequestInputObjectSchema } from './AudioVisualUpdateWithoutServiceRequestInput.schema';
import { AudioVisualUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './AudioVisualUncheckedUpdateWithoutServiceRequestInput.schema';
import { AudioVisualCreateWithoutServiceRequestInputObjectSchema } from './AudioVisualCreateWithoutServiceRequestInput.schema';
import { AudioVisualUncheckedCreateWithoutServiceRequestInputObjectSchema } from './AudioVisualUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualUpsertWithoutServiceRequestInput> = z
    .object({
        update: z.union([
            z.lazy(() => AudioVisualUpdateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => AudioVisualUncheckedUpdateWithoutServiceRequestInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => AudioVisualCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => AudioVisualUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const AudioVisualUpsertWithoutServiceRequestInputObjectSchema = Schema;
