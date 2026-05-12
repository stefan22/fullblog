import { describe, it, expect } from 'vitest';
import { updatePostSchema } from '@/app/schemas/blog';

function validFile() {
  return new File(['x'], 'photo.png', { type: 'image/png' });
}

describe('updatePostSchema', () => {
  it('accepts payload without image', () => {
    const result = updatePostSchema.safeParse({
      postId: 'kg123',
      title: '123456',
      content: '1234567890',
    });
    expect(result.success).toBe(true);
  });

  it('accepts optional image file', () => {
    const result = updatePostSchema.safeParse({
      postId: 'kg123',
      title: '123456',
      content: '1234567890',
      image: validFile(),
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing postId', () => {
    const result = updatePostSchema.safeParse({
      title: '123456',
      content: '1234567890',
    });
    expect(result.success).toBe(false);
  });
});
