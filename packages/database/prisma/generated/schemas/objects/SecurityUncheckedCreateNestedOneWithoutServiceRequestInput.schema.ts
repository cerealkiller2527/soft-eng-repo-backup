import { z } from 'zod';
import { SecurityCreateWithoutServiceRequestInputObjectSchema } from './SecurityCreateWithoutServiceRequestInput.schema';
import { SecurityUncheckedCreateWithoutServiceRequestInputObjectSchema } from './SecurityUncheckedCreateWithoutServiceRequestInput.schema';
import { SecurityCreateOrConnectWithoutServiceRequestInputObjectSchema } from './SecurityCreateOrConnectWithoutServiceRequestInput.schema';
import { SecurityWhereUniqueInputObjectSchema } from './SecurityWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.SecurityUncheckedCreateNestedOneWithoutServiceRequestInput> = z
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
        connect: z.lazy(() => SecurityWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const SecurityUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema = Schema;
