import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestCreateWithoutLanguageInputObjectSchema } from './ServiceRequestCreateWithoutLanguageInput.schema';
import { ServiceRequestUncheckedCreateWithoutLanguageInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutLanguageInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutLanguageInput> = z
    .object({
        where: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutLanguageInputObjectSchema),
            z.lazy(() => ServiceRequestUncheckedCreateWithoutLanguageInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceRequestCreateOrConnectWithoutLanguageInputObjectSchema = Schema;
