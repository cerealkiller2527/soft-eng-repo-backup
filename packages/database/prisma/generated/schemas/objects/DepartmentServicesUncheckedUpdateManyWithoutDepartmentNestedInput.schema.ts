import { z } from 'zod';
import { DepartmentServicesCreateWithoutDepartmentInputObjectSchema } from './DepartmentServicesCreateWithoutDepartmentInput.schema';
import { DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema } from './DepartmentServicesUncheckedCreateWithoutDepartmentInput.schema';
import { DepartmentServicesCreateOrConnectWithoutDepartmentInputObjectSchema } from './DepartmentServicesCreateOrConnectWithoutDepartmentInput.schema';
import { DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInputObjectSchema } from './DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInput.schema';
import { DepartmentServicesCreateManyDepartmentInputEnvelopeObjectSchema } from './DepartmentServicesCreateManyDepartmentInputEnvelope.schema';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';
import { DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInputObjectSchema } from './DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInput.schema';
import { DepartmentServicesUpdateManyWithWhereWithoutDepartmentInputObjectSchema } from './DepartmentServicesUpdateManyWithWhereWithoutDepartmentInput.schema';
import { DepartmentServicesScalarWhereInputObjectSchema } from './DepartmentServicesScalarWhereInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesUncheckedUpdateManyWithoutDepartmentNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputObjectSchema),
                    z
                        .lazy(() => DepartmentServicesCreateWithoutDepartmentInputObjectSchema)
                        .array(),
                    z.lazy(
                        () => DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => DepartmentServicesCreateOrConnectWithoutDepartmentInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                DepartmentServicesCreateOrConnectWithoutDepartmentInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                DepartmentServicesUpsertWithWhereUniqueWithoutDepartmentInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => DepartmentServicesCreateManyDepartmentInputEnvelopeObjectSchema)
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
                        () =>
                            DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                DepartmentServicesUpdateWithWhereUniqueWithoutDepartmentInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            DepartmentServicesUpdateManyWithWhereWithoutDepartmentInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                DepartmentServicesUpdateManyWithWhereWithoutDepartmentInputObjectSchema
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

export const DepartmentServicesUncheckedUpdateManyWithoutDepartmentNestedInputObjectSchema = Schema;
