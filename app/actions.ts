'use server';

import { postSchema } from '@/app/schemas/blog';
import z from 'zod';
import { fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { getToken } from '@/lib/auth-server';

export async function createBlogAction(values: z.infer<typeof postSchema>) {
  try {
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error('Something went wrong');
    }

    const token = await getToken();

    await fetchMutation(
      api.posts.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
      },
      { token }
    );
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to create blog post',
    };
  }
  updateTag('blog');
  return redirect('/blog');
}
