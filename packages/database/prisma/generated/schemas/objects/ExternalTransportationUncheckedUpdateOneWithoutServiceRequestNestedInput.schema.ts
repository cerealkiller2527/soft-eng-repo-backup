import { z } from 'zod';
import { ExternalTransportationCreateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationCreateWithoutServiceRequestInput.schema';
import { ExternalTransportationUncheckedCreateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUncheckedCreateWithoutServiceRequestInput.schema';
import { ExternalTransportationCreateOrConnectWithoutServiceRequestInputObjectSchema } from './ExternalTransportationCreateOrConnectWithoutServiceRequestInput.schema';
import { ExternalTransportationUpsertWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUpsertWithoutServiceRequestInput.schema';
import { ExternalTransportationWhereUniqueInputObjectSchema } from './ExternalTransportationWhereUniqueInput.schema';
import { ExternalTransportationUpdateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUpdateWithoutServiceRequestInput.schema';
import { ExternalTransportationUncheckedUpdateWithoutServiceRequestInputObjectSchema } from './ExternalTransportationUncheckedUpdateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInput> =
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
            upsert: z
                .lazy(() => ExternalTransportationUpsertWithoutServiceRequestInputObjectSchema)
                .optional(),
            disconnect: z.boolean().optional(),
            delete: z.boolean().optional(),
            connect: z.lazy(() => ExternalTransportationWhereUniqueInputObjectSchema).optional(),
            update: z
                .union([
                    z.lazy(
                        () => ExternalTransportationUpdateWithoutServiceRequestInputObjectSchema
                    ),
                    z.lazy(
                        () =>
                            ExternalTransportationUncheckedUpdateWithoutServiceRequestInputObjectSchema
                    ),
                ])
                .optional(),
        })
        .strict();

export const ExternalTransportationUncheckedUpdateOneWithoutServiceRequestNestedInputObjectSchema =
    Schema;
