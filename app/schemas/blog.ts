import z from 'zod';

const titleField = z.string().min(6).max(50);
const contentField = z.string().min(10);

export const postSchema = z.object({
  title: titleField,
  content: contentField,
  image: z.instanceof(File),
});

export const updatePostSchema = z.object({
  postId: z.string().min(1),
  title: titleField,
  content: contentField,
  image: z.instanceof(File).optional(),
});
