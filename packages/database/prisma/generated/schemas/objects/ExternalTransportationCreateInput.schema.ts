import { z } from 'zod';
import { ServiceRequestCreateNestedOneWithoutExternalTransportationInputObjectSchema } from './ServiceRequestCreateNestedOneWithoutExternalTransportationInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationCreateInput> = z
    .object({
        fromWhere: z.string(),
        toWhere: z.string(),
        transportType: z.string(),
        patientName: z.string(),
        pickupTime: z.coerce.date(),
        serviceRequest: z.lazy(
            () => ServiceRequestCreateNestedOneWithoutExternalTransportationInputObjectSchema
        ),
    })
    .strict();

export const ExternalTransportationCreateInputObjectSchema = Schema;
