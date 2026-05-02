import path from 'node:path';
import { test, expect } from '@playwright/test';

const fixturePng = path.join(process.cwd(), 'tests/e2e/fixtures', 'tiny.png');

const describeCreate =
  process.env.E2E_SKIP_CREATE_JOURNEY ? test.describe.skip : test.describe;

describeCreate('sign up and create post', () => {
  test('registers a new user and creates a post', async ({ page }) => {
    test.setTimeout(120_000);

    const suffix = Date.now();
    const email = `e2e-${suffix}@example.com`;
    const title = `E2E Title ${suffix}`;
    const content = 'This is long enough body content for validation rules.';

    await page.goto('/auth/sign-up');

    await page.getByPlaceholder('Enter name').fill('E2E User');
    await page.getByPlaceholder('Enter email').fill(email);
    await page.getByPlaceholder('Enter password').fill('secretpass');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await page.getByTestId('nav-link-create').waitFor({
      state: 'visible',
      timeout: 30_000,
    });

    await page.goto('/create');

    await page.getByPlaceholder('enter post title ...').fill(title);
    await page.getByPlaceholder('Enter post content ...').fill(content);
    await page.locator('input[type="file"]').setInputFiles(fixturePng);

    await page.getByRole('button', { name: 'Create Post' }).click();

    await page.waitForURL(/\/blog$/, { timeout: 60_000 });

    await expect(page.getByRole('link', { name: title })).toBeVisible({
      timeout: 30_000,
    });
  });
});
