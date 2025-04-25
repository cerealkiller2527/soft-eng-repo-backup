import { z } from 'zod';
import { SecurityCreateWithoutServiceRequestInputObjectSchema } from './SecurityCreateWithoutServiceRequestInput.schema';
import { SecurityUncheckedCreateWithoutServiceRequestInputObjectSchema } from './SecurityUncheckedCreateWithoutServiceRequestInput.schema';
import { SecurityCreateOrConnectWithoutServiceRequestInputObjectSchema } from './SecurityCreateOrConnectWithoutServiceRequestInput.schema';
import { SecurityUpsertWithoutServiceRequestInputObjectSchema } from './SecurityUpsertWithoutServiceRequestInput.schema';
import { SecurityWhereUniqueInputObjectSchema } from './SecurityWhereUniqueInput.schema';
import { SecurityUpdateWithoutServiceRequestInputObjectSchema } from './SecurityUpdateWithoutServiceRequestInput.schema';
import { SecurityUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './SecurityUncheckedUpdateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityUncheckedUpdateOneWithoutServiceRequestNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => SecurityCreateWithoutServiceRequestInputObjectSchema),
                z.lazy(() => SecurityUncheckedCreateWithoutServiceRequestInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => SecurityCreateOrConnectWithoutServiceRequestInputObjectSchema)
            .optional(),
        upsert: z.lazy(() => SecurityUpsertWithoutServiceRequestInputObjectSchema).optional(),
        disconnect: z.boolean().optional(),
        delete: z.boolean().optional(),
        connect: z.lazy(() => SecurityWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => SecurityUpdateWithoutServiceRequestInputObjectSchema),
                z.lazy(() => SecurityUncheckedUpdateWithoutServiceRequestInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const SecurityUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema = Schema;
