'use server';

import { postSchema } from '@/app/schemas/blog';
import { fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getToken } from '@/lib/auth-server';

/**
 * Uses FormData so the browser sends a real File (Next Server Actions cannot
 * reliably serialize File inside a plain POJO argument from the client.)
 */
export async function createBlogAction(formData: FormData) {
  try {
    const parsed = postSchema.safeParse({
      title: formData.get('title'),
      content: formData.get('content'),
      image: formData.get('image'),
    });

    if (!parsed.success) {
      throw new Error('Something went wrong');
    }

    const token = await getToken();

    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token }
    );

    const uploadResult = await fetch(imageUrl, {
      method: 'POST',
      headers: {
        'Content-Type': parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResult.ok) {
      return {
        error: 'Failed to upload image',
      };
    }

    const { storageId } = await uploadResult.json();

    await fetchMutation(
      api.posts.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId,
      },
      { token }
    );
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to create blog post',
    };
  }

  revalidatePath('/blog');
  return redirect('/blog');
}
