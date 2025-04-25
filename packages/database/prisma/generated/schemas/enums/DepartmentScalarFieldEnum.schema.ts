import { z } from 'zod';

export const DepartmentScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'phoneNumber']);
