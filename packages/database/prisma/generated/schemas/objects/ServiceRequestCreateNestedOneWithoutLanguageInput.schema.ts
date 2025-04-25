import { z } from 'zod';
import { ServiceRequestCreateWithoutLanguageInputObjectSchema } from './ServiceRequestCreateWithoutLanguageInput.schema';
import { ServiceRequestUncheckedCreateWithoutLanguageInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutLanguageInput.schema';
import { ServiceRequestCreateOrConnectWithoutLanguageInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutLanguageInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutLanguageInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => ServiceRequestCreateWithoutLanguageInputObjectSchema),
                z.lazy(() => ServiceRequestUncheckedCreateWithoutLanguageInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => ServiceRequestCreateOrConnectWithoutLanguageInputObjectSchema)
            .optional(),
        connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const ServiceRequestCreateNestedOneWithoutLanguageInputObjectSchema = Schema;
