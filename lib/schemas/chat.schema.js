import { z } from 'zod';

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.union([z.string(), z.array(z.any())]).optional(),
  attachments: z.array(z.any()).optional(),
});

/** Bot meta fields are stripped before validation. */
export const chatBodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
  channel: z.enum(['widget', 'terminal']).optional(),
});
