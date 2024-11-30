import { type Page } from '@playwright/test';

export default async function goHome(page: Page) {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
}
