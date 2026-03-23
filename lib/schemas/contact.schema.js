import { z } from 'zod';

/** Bot meta fields are stripped before validation. */
export const contactBodySchema = z.object({
  name: z.string().min(1).max(500),
  email: z.string().email().max(320),
  message: z.string().min(1).max(20_000),
});
