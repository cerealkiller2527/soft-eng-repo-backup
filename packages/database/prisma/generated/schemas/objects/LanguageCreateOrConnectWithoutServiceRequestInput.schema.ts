import { z } from 'zod';
import { LanguageWhereUniqueInputObjectSchema } from './LanguageWhereUniqueInput.schema';
import { LanguageCreateWithoutServiceRequestInputObjectSchema } from './LanguageCreateWithoutServiceRequestInput.schema';
import { LanguageUncheckedCreateWithoutServiceRequestInputObjectSchema } from './LanguageUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageCreateOrConnectWithoutServiceRequestInput> = z
    .object({
        where: z.lazy(() => LanguageWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => LanguageCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => LanguageUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const LanguageCreateOrConnectWithoutServiceRequestInputObjectSchema = Schema;
