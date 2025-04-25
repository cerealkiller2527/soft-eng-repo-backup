import { z } from 'zod';
import { ExternalTransportationUpdateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUpdateWithoutServiceRequestInput.schema';
import { ExternalTransportationUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUncheckedUpdateWithoutServiceRequestInput.schema';
import { ExternalTransportationCreateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationCreateWithoutServiceRequestInput.schema';
import { ExternalTransportationUncheckedCreateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationUpsertWithoutServiceRequestInput> = z
    .object({
        update: z.union([
            z.lazy(() => ExternalTransportationUpdateWithoutServiceRequestInputObjectSchema),
            z.lazy(
                () => ExternalTransportationUncheckedUpdateWithoutServiceRequestInputObjectSchema
            ),
        ]),
        create: z.union([
            z.lazy(() => ExternalTransportationCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(
                () => ExternalTransportationUncheckedCreateWithoutServiceRequestInputObjectSchema
            ),
        ]),
    })
    .strict();

export const ExternalTransportationUpsertWithoutServiceRequestInputObjectSchema = Schema;
