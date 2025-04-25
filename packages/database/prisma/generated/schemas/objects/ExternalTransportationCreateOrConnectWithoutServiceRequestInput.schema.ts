import { z } from 'zod';
import { ExternalTransportationWhereUniqueInputObjectSchema } from './ExternalTransportationWhereUniqueInput.schema';
import { ExternalTransportationCreateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationCreateWithoutServiceRequestInput.schema';
import { ExternalTransportationUncheckedCreateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationCreateOrConnectWithoutServiceRequestInput> = z
    .object({
        where: z.lazy(() => ExternalTransportationWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => ExternalTransportationCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(
                () => ExternalTransportationUncheckedCreateWithoutServiceRequestInputObjectSchema
            ),
        ]),
    })
    .strict();

export const ExternalTransportationCreateOrConnectWithoutServiceRequestInputObjectSchema = Schema;
