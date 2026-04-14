import z from 'zod';

export const postSchema = z.object({
  title: z.string().min(6).max(50),
  content: z.string().min(10),
});
