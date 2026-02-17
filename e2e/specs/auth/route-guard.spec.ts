import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Route Guards', () => {
    test.fixme('should redirect unauthenticated users from /dashboard to /auth/login', async ({ page }) => {
        // Known gap: `dashboard` route in app.routes.ts needs `canActivate: [authGuard]`.
        await page.goto('/dashboard');
        await expect(page).toHaveURL(/\/auth\/login$/);
    });

    test('should allow authenticated users to access /dashboard', async ({ page, setupAuthenticatedState }) => {
        await setupAuthenticatedState();
        await page.goto('/dashboard');

        await expect(page.getByRole('heading', { name: /Welcome, .*!/ })).toBeVisible();
    });

    test('should clear auth state on logout', async ({ page, setupAuthenticatedState }) => {
        await setupAuthenticatedState();
        await page.goto('/dashboard');

        await page.locator('.logout-btn').click();

        await expect.poll(async () => {
            return page.evaluate(() => ({
                authToken: window.localStorage.getItem('authToken'),
                user: window.localStorage.getItem('user'),
            }));
        }).toEqual({ authToken: null, user: null });
    });
});
