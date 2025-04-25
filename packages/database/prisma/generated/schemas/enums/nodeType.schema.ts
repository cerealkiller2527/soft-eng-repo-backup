import { z } from 'zod';

export const nodeTypeSchema = z.enum([
    'Entrance',
    'Intermediary',
    'Staircase',
    'Elevator',
    'Location',
    'Help_Desk',
]);
