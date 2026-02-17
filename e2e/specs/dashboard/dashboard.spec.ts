import { test, expect } from '../../fixtures/auth.fixture';
import { TEST_USER } from '../../support/test-data';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page, setupAuthenticatedState }) => {
    await setupAuthenticatedState();
    await page.goto('/dashboard');
  });

  test('should display welcome message with user name', async ({ page }) => {
    await expect(page.getByRole('heading', { name: `Welcome, ${TEST_USER.name}!` })).toBeVisible();
  });

  test('should display all dashboard cards', async ({ page }) => {
    await expect(page.getByText('EX Rate Calculator')).toBeVisible();
    await expect(page.getByText('Time Converter')).toBeVisible();
    await expect(page.getByText('Quick Stats')).toBeVisible();
    await expect(page.getByText('Recent Tasks')).toBeVisible();
    await expect(page.getByText('Settings')).toBeVisible();
  });

  test('should navigate to exchange rate calculator', async ({ page }) => {
    await page.getByText('EX Rate Calculator').click();
    await expect(page).toHaveURL(/\/exchange-rate-calculator$/);
  });

  test('should have a working logout button', async ({ page }) => {
    await page.locator('.logout-btn').click();

    await expect.poll(async () => {
      return page.evaluate(() => ({
        authToken: window.localStorage.getItem('authToken'),
        user: window.localStorage.getItem('user'),
      }));
    }).toEqual({ authToken: null, user: null });
  });
});
