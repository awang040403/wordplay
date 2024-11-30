import { test, expect } from '@playwright/test';

test('create project and visit its tiles ', async ({ page }) => {
    await page.goto('/projects', { waitUntil: 'domcontentloaded' });

    // Create a new blank project
    await page.getByTestId('addproject').click();

    // Click the first preview link
    await page.getByTestId('preview').nth(1).click();

    // Wait for the URL redirect to the project.
    await page.waitForURL(/\/project\/.+/);

    // Expect an output view to be visible.
    await expect(page.getByTestId('output')).toHaveCount(1);

    // Expect to have an editor to be visible.
    await expect(page.getByTestId('editor')).toHaveCount(1);

    // Click to open the guide
    await page.getByTestId('docs-toggle').click();

    // Click to open the palette
    await page.getByTestId('palette-toggle').click();

    // Expect the guide to be visible.
    await expect(page.getByTestId('documentation')).toBeVisible();

    // // Expect the palette to be visible.
    await expect(page.getByTestId('palette')).toBeVisible();
});
