import { z } from 'zod';

export const EdgeScalarFieldEnumSchema = z.enum(['id', 'fromNodeId', 'toNodeId']);
