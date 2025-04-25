import { z } from 'zod';
import { EmployeeCreateWithoutServiceRequestInputObjectSchema } from './EmployeeCreateWithoutServiceRequestInput.schema';
import { EmployeeUncheckedCreateWithoutServiceRequestInputObjectSchema } from './EmployeeUncheckedCreateWithoutServiceRequestInput.schema';
import { EmployeeCreateOrConnectWithoutServiceRequestInputObjectSchema } from './EmployeeCreateOrConnectWithoutServiceRequestInput.schema';
import { EmployeeWhereUniqueInputObjectSchema } from './EmployeeWhereUniqueInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeCreateNestedOneWithoutServiceRequestInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => EmployeeCreateWithoutServiceRequestInputObjectSchema),
                z.lazy(() => EmployeeUncheckedCreateWithoutServiceRequestInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => EmployeeCreateOrConnectWithoutServiceRequestInputObjectSchema)
            .optional(),
        connect: z.lazy(() => EmployeeWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const EmployeeCreateNestedOneWithoutServiceRequestInputObjectSchema = Schema;
