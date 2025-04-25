import { z } from 'zod';
import { AudioVisualWhereUniqueInputObjectSchema } from './AudioVisualWhereUniqueInput.schema';
import { AudioVisualCreateWithoutServiceRequestInputObjectSchema } from './AudioVisualCreateWithoutServiceRequestInput.schema';
import { AudioVisualUncheckedCreateWithoutServiceRequestInputObjectSchema } from './AudioVisualUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualCreateOrConnectWithoutServiceRequestInput> = z
    .object({
        where: z.lazy(() => AudioVisualWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => AudioVisualCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => AudioVisualUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const AudioVisualCreateOrConnectWithoutServiceRequestInputObjectSchema = Schema;
