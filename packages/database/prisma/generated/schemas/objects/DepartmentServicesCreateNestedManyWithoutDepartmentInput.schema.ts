import { z } from 'zod';
import { DepartmentServicesCreateWithoutDepartmentInputObjectSchema } from './DepartmentServicesCreateWithoutDepartmentInput.schema';
import { DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema } from './DepartmentServicesUncheckedCreateWithoutDepartmentInput.schema';
import { DepartmentServicesCreateOrConnectWithoutDepartmentInputObjectSchema } from './DepartmentServicesCreateOrConnectWithoutDepartmentInput.schema';
import { DepartmentServicesCreateManyDepartmentInputEnvelopeObjectSchema } from './DepartmentServicesCreateManyDepartmentInputEnvelope.schema';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateNestedManyWithoutDepartmentInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputObjectSchema),
                z.lazy(() => DepartmentServicesCreateWithoutDepartmentInputObjectSchema).array(),
                z.lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema),
                z
                    .lazy(() => DepartmentServicesUncheckedCreateWithoutDepartmentInputObjectSchema)
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputObjectSchema),
                z
                    .lazy(() => DepartmentServicesCreateOrConnectWithoutDepartmentInputObjectSchema)
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => DepartmentServicesCreateManyDepartmentInputEnvelopeObjectSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const DepartmentServicesCreateNestedManyWithoutDepartmentInputObjectSchema = Schema;
