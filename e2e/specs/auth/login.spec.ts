import { test, expect } from '../../fixtures/auth.fixture';
import {
    TEST_USER,
    TEST_CREDENTIALS,
    INVALID_CREDENTIALS,
    TEST_TOKEN,
} from '../../support/test-data';

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/login');
    });

    test('should display the login form', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });

    test('should show validation errors for empty fields', async ({ page }) => {
        await page.locator('#email').click();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        await expect(page.locator('span.error', { hasText: 'Please enter a valid email' })).toBeVisible();
        await expect(page.locator('span.error', { hasText: 'Password is required' })).toBeVisible();
    });

    test('should login successfully and redirect to dashboard', async ({ page, mockLoginAPI }) => {
        await mockLoginAPI();

        await page.locator('#email').fill(TEST_CREDENTIALS.email);
        await page.locator('#password').fill(TEST_CREDENTIALS.password);
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL(/\/dashboard$/);
        await expect(page.getByRole('heading', { name: `Welcome, ${TEST_USER.name}!` })).toBeVisible();
    });

    test('should display error message on login failure', async ({ page, mockLoginAPI }) => {
        await mockLoginAPI({ success: false, error: 'Invalid credentials' });

        await page.locator('#email').fill(INVALID_CREDENTIALS.email);
        await page.locator('#password').fill(INVALID_CREDENTIALS.password);
        await page.getByRole('button', { name: 'Login' }).click();

        const errorMessage = page.locator('div.error-message');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Invalid credentials');
    });

    test('should disable submit button while loading', async ({ page }) => {
        await page.route('**/api/auth/login', async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    token: TEST_TOKEN,
                    user: TEST_USER,
                }),
            });
        });

        await page.locator('#email').fill(TEST_CREDENTIALS.email);
        await page.locator('#password').fill(TEST_CREDENTIALS.password);

        const submitButton = page.getByRole('button', { name: 'Login' });
        await submitButton.click();

        await expect(page.getByRole('button', { name: 'Logging in...' })).toBeDisabled();
        await expect(page).toHaveURL(/\/dashboard$/);
    });
});
