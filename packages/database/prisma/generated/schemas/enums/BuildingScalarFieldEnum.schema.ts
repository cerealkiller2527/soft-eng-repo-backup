import { z } from 'zod';

export const BuildingScalarFieldEnumSchema = z.enum(['id', 'name', 'address', 'phoneNumber']);
