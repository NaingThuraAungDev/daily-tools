import { test as base, expect, type Page } from '@playwright/test';

import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';
import { TEST_TOKEN, TEST_USER } from '../support/test-data';

type LoginResponse = {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
        roles: readonly string[];
        createdAt: string;
        updatedAt: string;
    };
};

type AuthFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    mockLoginAPI: () => Promise<void>;
    setupAuthenticatedState: () => Promise<void>;
};

const createLoginResponse = (): LoginResponse => ({
    token: TEST_TOKEN,
    user: TEST_USER,
});

const setAuthInLocalStorage = async (page: Page): Promise<void> => {
    // Navigate to a page first, then set localStorage
    await page.goto('/');

    await page.evaluate(
        ({ token, user }) => {
            window.localStorage.setItem('authToken', token);
            window.localStorage.setItem('user', JSON.stringify(user));
        },
        { token: TEST_TOKEN, user: TEST_USER },
    );
};

export const test = base.extend<AuthFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    mockLoginAPI: async ({ page }, use) => {
        await use(async () => {
            await page.route('**/api/auth/login', async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(createLoginResponse()),
                });
            });
        });
    },

    setupAuthenticatedState: async ({ page }, use) => {
        await use(async () => {
            await setAuthInLocalStorage(page);
        });
    },
});

export { expect };