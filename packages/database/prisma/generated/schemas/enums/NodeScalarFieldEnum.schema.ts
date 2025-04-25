import { z } from 'zod';

export const NodeScalarFieldEnumSchema = z.enum(['id', 'type', 'description', 'lat', 'long']);
