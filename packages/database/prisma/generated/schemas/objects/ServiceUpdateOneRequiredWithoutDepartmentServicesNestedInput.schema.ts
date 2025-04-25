import { z } from 'zod';
import { ServiceCreateWithoutDepartmentServicesInputObjectSchema } from './ServiceCreateWithoutDepartmentServicesInput.schema';
import { ServiceUncheckedCreateWithoutDepartmentServicesInputObjectSchema } from './ServiceUncheckedCreateWithoutDepartmentServicesInput.schema';
import { ServiceCreateOrConnectWithoutDepartmentServicesInputObjectSchema } from './ServiceCreateOrConnectWithoutDepartmentServicesInput.schema';
import { ServiceUpsertWithoutDepartmentServicesInputObjectSchema } from './ServiceUpsertWithoutDepartmentServicesInput.schema';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';
import { ServiceUpdateWithoutDepartmentServicesInputObjectSchema } from './ServiceUpdateWithoutDepartmentServicesInput.schema';
import { ServiceUncheckedUpdateWithoutDepartmentServicesInputObjectSchema } from './ServiceUncheckedUpdateWithoutDepartmentServicesInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => ServiceCreateWithoutDepartmentServicesInputObjectSchema),
                z.lazy(() => ServiceUncheckedCreateWithoutDepartmentServicesInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => ServiceCreateOrConnectWithoutDepartmentServicesInputObjectSchema)
            .optional(),
        upsert: z.lazy(() => ServiceUpsertWithoutDepartmentServicesInputObjectSchema).optional(),
        connect: z.lazy(() => ServiceWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => ServiceUpdateWithoutDepartmentServicesInputObjectSchema),
                z.lazy(() => ServiceUncheckedUpdateWithoutDepartmentServicesInputObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const ServiceUpdateOneRequiredWithoutDepartmentServicesNestedInputObjectSchema = Schema;
