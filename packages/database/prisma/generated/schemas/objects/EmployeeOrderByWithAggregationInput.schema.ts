import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { EmployeeCountOrderByAggregateInputObjectSchema } from './EmployeeCountOrderByAggregateInput.schema';
import { EmployeeAvgOrderByAggregateInputObjectSchema } from './EmployeeAvgOrderByAggregateInput.schema';
import { EmployeeMaxOrderByAggregateInputObjectSchema } from './EmployeeMaxOrderByAggregateInput.schema';
import { EmployeeMinOrderByAggregateInputObjectSchema } from './EmployeeMinOrderByAggregateInput.schema';
import { EmployeeSumOrderByAggregateInputObjectSchema } from './EmployeeSumOrderByAggregateInput.schema';

import type { Prisma } from '../../../../.prisma/client';

const Schema: z.ZodType<Prisma.EmployeeOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        employeeType: z.lazy(() => SortOrderSchema).optional(),
        canService: z.lazy(() => SortOrderSchema).optional(),
        language: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => EmployeeCountOrderByAggregateInputObjectSchema).optional(),
        _avg: z.lazy(() => EmployeeAvgOrderByAggregateInputObjectSchema).optional(),
        _max: z.lazy(() => EmployeeMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => EmployeeMinOrderByAggregateInputObjectSchema).optional(),
        _sum: z.lazy(() => EmployeeSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();

export const EmployeeOrderByWithAggregationInputObjectSchema = Schema;
