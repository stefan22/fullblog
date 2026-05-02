import { test, expect } from '@playwright/test';

const postId = process.env.E2E_POST_ID?.trim();

test.describe('post detail', () => {
  test('shows post content when id is valid', async ({ page }) => {
    test.skip(!postId, 'Set E2E_POST_ID to a real posts table id to run this test');
    await page.goto(`/blog/${postId}`);
    await expect(page.getByText('No post found')).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to blog' })).toBeVisible();
  });
});
