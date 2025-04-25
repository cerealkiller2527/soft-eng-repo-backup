import { z } from 'zod';
import { EmployeeWhereUniqueInputObjectSchema } from './EmployeeWhereUniqueInput.schema';
import { EmployeeCreateWithoutServiceRequestInputObjectSchema } from './EmployeeCreateWithoutServiceRequestInput.schema';
import { EmployeeUncheckedCreateWithoutServiceRequestInputObjectSchema } from './EmployeeUncheckedCreateWithoutServiceRequestInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeCreateOrConnectWithoutServiceRequestInput> = z
    .object({
        where: z.lazy(() => EmployeeWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => EmployeeCreateWithoutServiceRequestInputObjectSchema),
            z.lazy(() => EmployeeUncheckedCreateWithoutServiceRequestInputObjectSchema),
        ]),
    })
    .strict();

export const EmployeeCreateOrConnectWithoutServiceRequestInputObjectSchema = Schema;
