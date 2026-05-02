import { describe, it, expect, vi, beforeEach } from 'vitest';

const fetchMutation = vi.fn();
const getToken = vi.fn();
const revalidatePath = vi.fn();
const redirect = vi.fn();

vi.mock('convex/nextjs', () => ({
  fetchMutation,
}));

vi.mock('@/lib/auth-server', () => ({
  getToken,
}));

vi.mock('next/cache', () => ({
  revalidatePath,
}));

vi.mock('next/navigation', () => ({
  redirect,
}));

function validFormData() {
  const formData = new FormData();
  formData.append('title', '123456');
  formData.append('content', '1234567890');
  formData.append('image', new File([], 'cover.png', { type: 'image/png' }));
  return formData;
}

describe('createBlogAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirect.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT');
    });
  });

  it('returns generic error when validation fails', async () => {
    const { createBlogAction } = await import('@/app/actions');

    const formData = new FormData();
    formData.append('title', 'short');
    formData.append('content', '1234567890');
    formData.append(
      'image',
      new File([], 'cover.png', { type: 'image/png' })
    );

    const result = await createBlogAction(formData);

    expect(result).toEqual({ error: 'Failed to create blog post' });
    expect(fetchMutation).not.toHaveBeenCalled();
  });

  it('returns upload error when image POST is not ok', async () => {
    getToken.mockResolvedValue('test-token');
    fetchMutation.mockResolvedValueOnce('https://upload.example/upload');
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn(),
    });

    const { createBlogAction } = await import('@/app/actions');

    const result = await createBlogAction(validFormData());

    expect(result).toEqual({ error: 'Failed to upload image' });
    expect(fetchMutation).toHaveBeenCalledTimes(1);
    expect(revalidatePath).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('calls mutations, revalidates, and redirects on success', async () => {
    getToken.mockResolvedValue('test-token');
    fetchMutation
      .mockResolvedValueOnce('https://upload.example/upload')
      .mockResolvedValueOnce(undefined);
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ storageId: 'kg_storage_test123' }),
    });

    const { createBlogAction } = await import('@/app/actions');

    await expect(createBlogAction(validFormData())).rejects.toThrow(
      'NEXT_REDIRECT'
    );

    expect(fetchMutation).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://upload.example/upload',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'image/png' },
      })
    );
    expect(revalidatePath).toHaveBeenCalledWith('/blog');
    expect(redirect).toHaveBeenCalledWith('/blog');
  });

  it('returns generic error when fetchMutation throws', async () => {
    getToken.mockResolvedValue('test-token');
    fetchMutation.mockRejectedValueOnce(new Error('network'));

    const { createBlogAction } = await import('@/app/actions');

    const result = await createBlogAction(validFormData());

    expect(result).toEqual({ error: 'Failed to create blog post' });
  });
});
