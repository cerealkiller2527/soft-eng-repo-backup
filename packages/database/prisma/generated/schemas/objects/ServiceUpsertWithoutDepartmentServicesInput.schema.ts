import { z } from 'zod';
import { ServiceUpdateWithoutDepartmentServicesInputObjectSchema } from './ServiceUpdateWithoutDepartmentServicesInput.schema';
import { ServiceUncheckedUpdateWithoutDepartmentServicesInputObjectSchema } from './ServiceUncheckedUpdateWithoutDepartmentServicesInput.schema';
import { ServiceCreateWithoutDepartmentServicesInputObjectSchema } from './ServiceCreateWithoutDepartmentServicesInput.schema';
import { ServiceUncheckedCreateWithoutDepartmentServicesInputObjectSchema } from './ServiceUncheckedCreateWithoutDepartmentServicesInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.ServiceUpsertWithoutDepartmentServicesInput> = z
    .object({
        update: z.union([
            z.lazy(() => ServiceUpdateWithoutDepartmentServicesInputObjectSchema),
            z.lazy(() => ServiceUncheckedUpdateWithoutDepartmentServicesInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => ServiceCreateWithoutDepartmentServicesInputObjectSchema),
            z.lazy(() => ServiceUncheckedCreateWithoutDepartmentServicesInputObjectSchema),
        ]),
    })
    .strict();

export const ServiceUpsertWithoutDepartmentServicesInputObjectSchema = Schema;
