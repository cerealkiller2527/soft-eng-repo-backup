import { z } from 'zod';
import { ServiceRequestCreateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestCreateWithoutExternalTransportationInput.schema';
import { ServiceRequestUncheckedCreateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutExternalTransportationInput.schema';
import { ServiceRequestCreateOrConnectWithoutExternalTransportationInputObjectSchema } from './ServiceRequestCreateOrConnectWithoutExternalTransportationInput.schema';
import { ServiceRequestUpsertWithoutExternalTransportationInputObjectSchema } from './ServiceRequestUpsertWithoutExternalTransportationInput.schema';
import { ServiceRequestWhereUniqueInputObjectSchema } from './ServiceRequestWhereUniqueInput.schema';
import { ServiceRequestUpdateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestUpdateWithoutExternalTransportationInput.schema';
import { ServiceRequestUncheckedUpdateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutExternalTransportationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpdateOneRequiredWithoutExternalTransportationNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(
                        () => ServiceRequestCreateWithoutExternalTransportationInputObjectSchema
                    ),
                    z.lazy(
                        () =>
                            ServiceRequestUncheckedCreateWithoutExternalTransportationInputObjectSchema
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(
                    () =>
                        ServiceRequestCreateOrConnectWithoutExternalTransportationInputObjectSchema
                )
                .optional(),
            upsert: z
                .lazy(() => ServiceRequestUpsertWithoutExternalTransportationInputObjectSchema)
                .optional(),
            connect: z.lazy(() => ServiceRequestWhereUniqueInputObjectSchema).optional(),
            update: z
                .union([
                    z.lazy(
                        () => ServiceRequestUpdateWithoutExternalTransportationInputObjectSchema
                    ),
                    z.lazy(
                        () =>
                            ServiceRequestUncheckedUpdateWithoutExternalTransportationInputObjectSchema
                    ),
                ])
                .optional(),
        })
        .strict();

export const ServiceRequestUpdateOneRequiredWithoutExternalTransportationNestedInputObjectSchema =
    Schema;
