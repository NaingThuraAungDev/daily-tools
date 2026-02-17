import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.locator('button[type="submit"]');
    this.errorMessage = this.page.locator('.error-message');
    this.heading = this.page.getByRole('heading', { name: 'Login', level: 2 });
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getValidationError(field: 'email' | 'password'): Promise<string> {
    const fieldIndex = field === 'email' ? 0 : 1;
    return this.page.locator('span.error').nth(fieldIndex).innerText();
  }
}