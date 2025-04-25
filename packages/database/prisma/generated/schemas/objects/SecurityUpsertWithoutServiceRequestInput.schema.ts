import { z } from 'zod';
import { SecurityUpdateWithoutServiceRequestInputObjectSchema } from './SecurityUpdateWithoutServiceRequestInput.schema';
import { SecurityUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './SecurityUncheckedUpdateWithoutServiceRequestInput.schema';
import { SecurityCreateWithoutServiceRequestInputObjectSchema } from './SecurityCreateWithoutServiceRequestInput.schema';
import { SecurityUncheckedCreateWithoutServiceRequestInputObjectSchema } from './SecurityUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityUpsertWithoutServiceRequestInput> = z
    .object({
        update: z.union([
            z.lazy(() => SecurityUpdateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => SecurityUncheckedUpdateWithoutServiceRequestInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => SecurityCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => SecurityUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const SecurityUpsertWithoutServiceRequestInputObjectSchema = Schema;
