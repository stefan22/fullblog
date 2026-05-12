import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { fetchMutation } from 'convex/nextjs';

export async function uploadPostImage(
  image: File,
  token: string | null | undefined
): Promise<Id<'_storage'> | { error: string }> {
  const imageUrl = await fetchMutation(
    api.posts.generateImageUploadUrl,
    {},
    { token: token ?? undefined }
  );

  const uploadResult = await fetch(imageUrl, {
    method: 'POST',
    headers: {
      'Content-Type': image.type,
    },
    body: image,
  });

  if (!uploadResult.ok) {
    return { error: 'Failed to upload image' };
  }

  const { storageId } = await uploadResult.json();
  return storageId as Id<'_storage'>;
}
