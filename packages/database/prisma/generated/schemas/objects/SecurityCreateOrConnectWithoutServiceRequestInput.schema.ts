import { z } from 'zod';
import { SecurityWhereUniqueInputObjectSchema } from './SecurityWhereUniqueInput.schema';
import { SecurityCreateWithoutServiceRequestInputObjectSchema } from './SecurityCreateWithoutServiceRequestInput.schema';
import { SecurityUncheckedCreateWithoutServiceRequestInputObjectSchema } from './SecurityUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityCreateOrConnectWithoutServiceRequestInput> = z
    .object({
        where: z.lazy(() => SecurityWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => SecurityCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => SecurityUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const SecurityCreateOrConnectWithoutServiceRequestInputObjectSchema = Schema;
