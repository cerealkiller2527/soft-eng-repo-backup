import { z } from 'zod';
import { LanguageUpdateWithoutServiceRequestInputObjectSchema } from './LanguageUpdateWithoutServiceRequestInput.schema';
import { LanguageUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './LanguageUncheckedUpdateWithoutServiceRequestInput.schema';
import { LanguageCreateWithoutServiceRequestInputObjectSchema } from './LanguageCreateWithoutServiceRequestInput.schema';
import { LanguageUncheckedCreateWithoutServiceRequestInputObjectSchema } from './LanguageUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageUpsertWithoutServiceRequestInput> = z
    .object({
        update: z.union([
            z.lazy(() => LanguageUpdateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => LanguageUncheckedUpdateWithoutServiceRequestInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => LanguageCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => LanguageUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const LanguageUpsertWithoutServiceRequestInputObjectSchema = Schema;
