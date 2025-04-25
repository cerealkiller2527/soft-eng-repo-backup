import { z } from 'zod';
import { DepartmentServicesCreateWithoutServiceInputObjectSchema } from './DepartmentServicesCreateWithoutServiceInput.schema';
import { DepartmentServicesUncheckedCreateWithoutServiceInputObjectSchema } from './DepartmentServicesUncheckedCreateWithoutServiceInput.schema';
import { DepartmentServicesCreateOrConnectWithoutServiceInputObjectSchema } from './DepartmentServicesCreateOrConnectWithoutServiceInput.schema';
import { DepartmentServicesCreateManyServiceInputEnvelopeObjectSchema } from './DepartmentServicesCreateManyServiceInputEnvelope.schema';
import { DepartmentServicesWhereUniqueInputObjectSchema } from './DepartmentServicesWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.DepartmentServicesCreateNestedManyWithoutServiceInput> = z
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
        createMany: z
            .lazy(() => DepartmentServicesCreateManyServiceInputEnvelopeObjectSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema),
                z.lazy(() => DepartmentServicesWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict();

export const DepartmentServicesCreateNestedManyWithoutServiceInputObjectSchema = Schema;
