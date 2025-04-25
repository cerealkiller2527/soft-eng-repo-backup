import { z } from 'zod';
import { ServiceCreateWithoutDepartmentServicesInputObjectSchema } from './ServiceCreateWithoutDepartmentServicesInput.schema';
import { ServiceUncheckedCreateWithoutDepartmentServicesInputObjectSchema } from './ServiceUncheckedCreateWithoutDepartmentServicesInput.schema';
import { ServiceCreateOrConnectWithoutDepartmentServicesInputObjectSchema } from './ServiceCreateOrConnectWithoutDepartmentServicesInput.schema';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutDepartmentServicesInput> = z
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
        connect: z.lazy(() => ServiceWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const ServiceCreateNestedOneWithoutDepartmentServicesInputObjectSchema = Schema;
