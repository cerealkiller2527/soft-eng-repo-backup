import { z } from 'zod';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestCreateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestCreateWithoutExternalTransportationInput.schema';
import { ServiceRequestUncheckedCreateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutExternalTransportationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateOrConnectWithoutExternalTransportationInput> = z
    .object({
        where: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutExternalTransportationInputObjectSchema),
            z.lazy(
                () => ServiceRequestUncheckedCreateWithoutExternalTransportationInputObjectSchema
            ),
        ]),
    })
    .strict();

export const ServiceRequestCreateOrConnectWithoutExternalTransportationInputObjectSchema = Schema;
