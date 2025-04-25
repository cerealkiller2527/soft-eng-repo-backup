import { z } from 'zod';
import { AudioVisualCreateWithoutServiceRequestInputObjectSchema } from './AudioVisualCreateWithoutServiceRequestInput.schema';
import { AudioVisualUncheckedCreateWithoutServiceRequestInputObjectSchema } from './AudioVisualUncheckedCreateWithoutServiceRequestInput.schema';
import { AudioVisualCreateOrConnectWithoutServiceRequestInputObjectSchema } from './AudioVisualCreateOrConnectWithoutServiceRequestInput.schema';
import { AudioVisualWhereUniqueInputObjectSchema } from './AudioVisualWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualCreateNestedOneWithoutServiceRequestInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => AudioVisualCreateWithoutServiceRequestInputObjectSchema),
                z.lazy(() => AudioVisualUncheckedCreateWithoutServiceRequestInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => AudioVisualCreateOrConnectWithoutServiceRequestInputObjectSchema)
            .optional(),
        connect: z.lazy(() => AudioVisualWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const AudioVisualCreateNestedOneWithoutServiceRequestInputObjectSchema = Schema;
