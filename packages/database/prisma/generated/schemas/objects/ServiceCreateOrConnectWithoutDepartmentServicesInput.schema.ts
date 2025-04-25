import { z } from 'zod';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';
import { ServiceCreateWithoutDepartmentServicesInputObjectSchema } from './ServiceCreateWithoutDepartmentServicesInput.schema';
import { ServiceUncheckedCreateWithoutDepartmentServicesInputObjectSchema } from './ServiceUncheckedCreateWithoutDepartmentServicesInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutDepartmentServicesInput> = z
    .object({
        where: z.lazy(() => ServiceWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => ServiceCreateWithoutDepartmentServicesInputObjectSchema),
            z.lazy(() => ServiceUncheckedCreateWithoutDepartmentServicesInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceCreateOrConnectWithoutDepartmentServicesInputObjectSchema = Schema;
