import { z } from 'zod';
import { LanguageCreateWithoutServiceRequestInputObjectSchema } from './LanguageCreateWithoutServiceRequestInput.schema';
import { LanguageUncheckedCreateWithoutServiceRequestInputObjectSchema } from './LanguageUncheckedCreateWithoutServiceRequestInput.schema';
import { LanguageCreateOrConnectWithoutServiceRequestInputObjectSchema } from './LanguageCreateOrConnectWithoutServiceRequestInput.schema';
import { LanguageWhereUniqueInputObjectSchema } from './LanguageWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageUncheckedCreateNestedOneWithoutServiceRequestInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => LanguageCreateWithoutServiceRequestInputObjectSchema),
                z.lazy(() => LanguageUncheckedCreateWithoutServiceRequestInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => LanguageCreateOrConnectWithoutServiceRequestInputObjectSchema)
            .optional(),
        connect: z.lazy(() => LanguageWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const LanguageUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema = Schema;
