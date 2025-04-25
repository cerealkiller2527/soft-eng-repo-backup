import { z } from 'zod';
import { LanguageCreateWithoutServiceRequestInputObjectSchema } from './LanguageCreateWithoutServiceRequestInput.schema';
import { LanguageUncheckedCreateWithoutServiceRequestInputObjectSchema } from './LanguageUncheckedCreateWithoutServiceRequestInput.schema';
import { LanguageCreateOrConnectWithoutServiceRequestInputObjectSchema } from './LanguageCreateOrConnectWithoutServiceRequestInput.schema';
import { LanguageUpsertWithoutServiceRequestInputObjectSchema } from './LanguageUpsertWithoutServiceRequestInput.schema';
import { LanguageWhereUniqueInputObjectSchema } from './LanguageWhereUniqueInput.schema';
import { LanguageUpdateWithoutServiceRequestInputObjectSchema } from './LanguageUpdateWithoutServiceRequestInput.schema';
import { LanguageUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './LanguageUncheckedUpdateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.LanguageUncheckedUpdateOneWithoutServiceRequestNestedInput> = z
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
        upsert: z.lazy(() => LanguageUpsertWithoutServiceRequestInputObjectSchema).optional(),
        disconnect: z.boolean().optional(),
        delete: z.boolean().optional(),
        connect: z.lazy(() => LanguageWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => LanguageUpdateWithoutServiceRequestInputObjectSchema),
                z.lazy(() => LanguageUncheckedUpdateWithoutServiceRequestInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const LanguageUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema = Schema;
