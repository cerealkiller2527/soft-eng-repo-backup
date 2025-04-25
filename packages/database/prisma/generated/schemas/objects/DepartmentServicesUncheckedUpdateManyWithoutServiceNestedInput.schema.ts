import { z } from 'zod';
import { DepartmentServicesCreateWithoutServiceInputObjectSchema } from './DepartmentServicesCreateWithoutServiceInput.schema';
import { DepartmentServicesUncheckedCreateWithoutServiceInputObjectSchema } from './DepartmentServicesUncheckedCreateWithoutServiceInput.schema';
import { DepartmentServicesCreateOrConnectWithoutServiceInputObjectSchema } from './DepartmentServicesCreateOrConnectWithoutServiceInput.schema';
import { DepartmentServicesUpsertWithWhereUniqueWithoutServiceInputObjectSchema } from './DepartmentServicesUpsertWithWhereUniqueWithoutServiceInput.schema';
import { DepartmentServicesCreateManyServiceInputEnvelopeObjectSchema } from './DepartmentServicesCreateManyServiceInputEnvelope.schema';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesUpdateWithWhereUniqueWithoutServiceInputObjectSchema } from './DepartmentServicesUpdateWithWhereUniqueWithoutServiceInput.schema';
import { DepartmentServicesUpdateManyWithWhereWithoutServiceInputObjectSchema } from './DepartmentServicesUpdateManyWithWhereWithoutServiceInput.schema';
import { DepartmentServicesScalarWhereInputObjectSchema } from './DepartmentServicesScalarWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateManyWithoutServiceNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => DepartmentServicesCreateWithoutServiceInputObjectSchema),
                z.lazy(() => DepartmentServicesCreateWithoutServiceInputObjectSchema).array(),
                z.lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputObjectSchema),
                z
                    .lazy(() => DepartmentServicesUncheckedCreateWithoutServiceInputObjectSchema)
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputObjectSchema),
                z
                    .lazy(() => DepartmentServicesCreateOrConnectWithoutServiceInputObjectSchema)
                    .array(),
            ])
            .optional(),
        upsert: z
            .union([
                z.lazy(
                    () => DepartmentServicesUpsertWithWhereUniqueWithoutServiceInputObjectSchema
                ),
                z
                    .lazy(
                        () => DepartmentServicesUpsertWithWhereUniqueWithoutServiceInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => DepartmentServicesCreateManyServiceInputEnvelopeObjectSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () => DepartmentServicesUpdateWithWhereUniqueWithoutServiceInputObjectSchema
                ),
                z
                    .lazy(
                        () => DepartmentServicesUpdateWithWhereUniqueWithoutServiceInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(() => DepartmentServicesUpdateManyWithWhereWithoutServiceInputObjectSchema),
                z
                    .lazy(
                        () => DepartmentServicesUpdateManyWithWhereWithoutServiceInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => DepartmentServicesScalarWhereInputObjectSchema),
                z.lazy(() => DepartmentServicesScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const DepartmentServicesUncheckedUpdateManyWithoutServiceNestedInputObjectSchema = Schema;
