import { z } from 'zod';

export const PrioritySchema = z.enum(['Low', 'Medium', 'High', 'Emergency']);
