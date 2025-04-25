import { z } from 'zod';
import { ExternalTransportationCreateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationCreateWithoutServiceRequestInput.schema';
import { ExternalTransportationUncheckedCreateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUncheckedCreateWithoutServiceRequestInput.schema';
import { ExternalTransportationCreateOrConnectWithoutServiceRequestInputObjectSchema } from './ExternalTransportationCreateOrConnectWithoutServiceRequestInput.schema';
import { ExternalTransportationWhereUniqueInputObjectSchema } from './ExternalTransportationWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(
                        () => ExternalTransportationCreateWithoutServiceRequestInputObjectSchema
                    ),
                    z.lazy(
                        () =>
                            ExternalTransportationUncheckedCreateWithoutServiceRequestInputObjectSchema
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(
                    () =>
                        ExternalTransportationCreateOrConnectWithoutServiceRequestInputObjectSchema
                )
                .optional(),
            connect: z.lazy(() => ExternalTransportationWhereUniqueInputObjectSchema).optional(),
        })
        .strict();

export const ExternalTransportationUncheckedCreateNestedOneWithoutServiceRequestInputObjectSchema =
    Schema;
