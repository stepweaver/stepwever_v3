import { z } from 'zod';

const contentPartSchema = z
  .object({
    type: z.enum(['text', 'image_url']),
    text: z.string().max(2000).optional(),
    image_url: z
      .object({
        url: z.string().max(6 * 1024 * 1024),
      })
      .optional(),
  })
  .strict();

const attachmentSchema = z
  .object({
    dataUrl: z.string().startsWith('data:image/').max(6 * 1024 * 1024),
  })
  .strict();

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.union([z.string().max(20_000), z.array(contentPartSchema).max(10)]).optional(),
  attachments: z.array(attachmentSchema).max(5).optional(),
});

/** Bot meta fields are stripped before validation. */
export const chatBodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
  channel: z.enum(['widget', 'terminal']).optional(),
});
