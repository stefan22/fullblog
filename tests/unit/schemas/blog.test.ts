import { describe, it, expect } from 'vitest';
import { postSchema } from '@/app/schemas/blog';

function validFile() {
  return new File([], 'photo.png', { type: 'image/png' });
}

describe('postSchema', () => {
  it('accepts boundary-valid payload', () => {
    const result = postSchema.safeParse({
      title: '123456',
      content: '1234567890',
      image: validFile(),
    });
    expect(result.success).toBe(true);
  });

  it('rejects title shorter than 6', () => {
    const result = postSchema.safeParse({
      title: '12345',
      content: '1234567890',
      image: validFile(),
    });
    expect(result.success).toBe(false);
  });

  it('rejects title longer than 50', () => {
    const result = postSchema.safeParse({
      title: 'a'.repeat(51),
      content: '1234567890',
      image: validFile(),
    });
    expect(result.success).toBe(false);
  });

  it('rejects content shorter than 10', () => {
    const result = postSchema.safeParse({
      title: '123456',
      content: '123456789',
      image: validFile(),
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing image', () => {
    const result = postSchema.safeParse({
      title: '123456',
      content: '1234567890',
      image: undefined,
    });
    expect(result.success).toBe(false);
  });

  it('rejects non-File image', () => {
    const result = postSchema.safeParse({
      title: '123456',
      content: '1234567890',
      image: 'not-a-file',
    });
    expect(result.success).toBe(false);
  });
});
