import { z } from 'zod';

export const StatusSchema = z.enum(['NOTASSIGNED', 'ASSIGNED', 'INPROGRESS', 'COMPLETED']);
