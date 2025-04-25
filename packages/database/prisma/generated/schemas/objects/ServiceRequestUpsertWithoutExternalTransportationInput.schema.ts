import { z } from 'zod';
import { ServiceRequestUpdateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestUpdateWithoutExternalTransportationInput.schema';
import { ServiceRequestUncheckedUpdateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestUncheckedUpdateWithoutExternalTransportationInput.schema';
import { ServiceRequestCreateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestCreateWithoutExternalTransportationInput.schema';
import { ServiceRequestUncheckedCreateWithoutExternalTransportationInputObjectSchema } from './ServiceRequestUncheckedCreateWithoutExternalTransportationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceRequestUpsertWithoutExternalTransportationInput> = z
    .object({
        update: z.union([
            z.lazy(() => ServiceRequestUpdateWithoutExternalTransportationInputObjectSchema),
            z.lazy(
                () => ServiceRequestUncheckedUpdateWithoutExternalTransportationInputObjectSchema
            ),
        ]),
        create: z.union([
            z.lazy(() => ServiceRequestCreateWithoutExternalTransportationInputObjectSchema),
            z.lazy(
                () => ServiceRequestUncheckedCreateWithoutExternalTransportationInputObjectSchema
            ),
        ]),
    })
    .strict();

export const ServiceRequestUpsertWithoutExternalTransportationInputObjectSchema = Schema;
