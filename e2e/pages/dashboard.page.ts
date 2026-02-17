import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    readonly welcomeHeading: Locator;
    readonly logoutButton: Locator;
    readonly exchangeRateCard: Locator;
    readonly timeConverterCard: Locator;

    constructor(private readonly page: Page) {
        this.welcomeHeading = this.page.locator('.welcome-section h1');
        this.logoutButton = this.page.getByRole('button', { name: 'Logout', exact: true });
        this.exchangeRateCard = this.page.getByText('EX Rate Calculator');
        this.timeConverterCard = this.page.getByText('Time Converter');
    }

    async goto(): Promise<void> {
        await this.page.goto('/dashboard');
    }

    async logout(): Promise<void> {
        await this.logoutButton.click();
    }

    async getWelcomeText(): Promise<string> {
        const text = await this.welcomeHeading.textContent();
        return text?.trim() ?? '';
    }
}