import { z } from 'zod';

export const ServerConfigSchema = z.object({
    name: z.string().min(1),
    url: z.string().url(),
});
