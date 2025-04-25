import { z } from 'zod';
import { ServiceRequestCreateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestCreateWithoutExternalTransportationInput.schema';
import { ServiceRequestUncheckedCreateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutExternalTransportationInput.schema';
import { ServiceRequestCreateOrConnectWithoutExternalTransportationInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutExternalTransportationInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestCreateNestedOneWithoutExternalTransportationInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => ServiceRequestCreateWithoutExternalTransportationInputObjectSchema),
                z.lazy(
                    () =>
                        ServiceRequestUncheckedCreateWithoutExternalTransportationInputObjectSchema
                ),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => ServiceRequestCreateOrConnectWithoutExternalTransportationInputObjectSchema)
            .optional(),
        connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const ServiceRequestCreateNestedOneWithoutExternalTransportationInputObjectSchema = Schema;
