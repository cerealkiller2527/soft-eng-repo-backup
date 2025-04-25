import { z } from 'zod';
import { AudioVisualCreateWithoutServiceRequestInputObjectSchema } from './AudioVisualCreateWithoutServiceRequestInput.schema';
import { AudioVisualUncheckedCreateWithoutServiceRequestInputObjectSchema } from './AudioVisualUncheckedCreateWithoutServiceRequestInput.schema';
import { AudioVisualCreateOrConnectWithoutServiceRequestInputObjectSchema } from './AudioVisualCreateOrConnectWithoutServiceRequestInput.schema';
import { AudioVisualUpsertWithoutServiceRequestInputObjectSchema } from './AudioVisualUpsertWithoutServiceRequestInput.schema';
import { AudioVisualWhereUniqueInputObjectSchema } from './AudioVisualWhereUniqueInput.schema';
import { AudioVisualUpdateWithoutServiceRequestInputObjectSchema } from './AudioVisualUpdateWithoutServiceRequestInput.schema';
import { AudioVisualUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './AudioVisualUncheckedUpdateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.AudioVisualUpdateOneWithoutServiceRequestNestedInput> = z
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
        upsert: z.lazy(() => AudioVisualUpsertWithoutServiceRequestInputObjectSchema).optional(),
        disconnect: z.boolean().optional(),
        delete: z.boolean().optional(),
        connect: z.lazy(() => AudioVisualWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => AudioVisualUpdateWithoutServiceRequestInputObjectSchema),
                z.lazy(() => AudioVisualUncheckedUpdateWithoutServiceRequestInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const AudioVisualUpdateOneWithoutServiceRequestNestedInputObjectSchema = Schema;
