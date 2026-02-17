# E2E Testing Guide

## 1. Overview
Playwright-based UI automation tests for the Daily Tools Angular app.

- **Test framework:** Playwright Test (`@playwright/test`)

## 2. Prerequisites
Before running e2e tests, ensure you have:

- Node.js installed
- Project dependencies installed:
  ```bash
  npm install
  ```
- Playwright browsers installed:
  ```bash
  npm run e2e:install
  ```

## 3. Project Structure
```text
e2e/
├── fixtures/
│   └── auth.fixture.ts        # Custom test fixtures (loginPage, dashboardPage, mockLoginAPI, setupAuthenticatedState)
├── pages/
│   ├── login.page.ts          # Login Page Object Model
│   └── dashboard.page.ts      # Dashboard Page Object Model
├── specs/
│   ├── auth/
│   │   ├── login.spec.ts      # Login flow tests
│   │   └── route-guard.spec.ts # Route guard tests
│   └── dashboard/
│       └── dashboard.spec.ts  # Dashboard tests
├── support/
│   └── test-data.ts           # Shared test constants
└── README.md
```

## 4. Running Tests
Use these npm scripts from the project root:

- `npm run e2e` — Run all tests headless
- `npm run e2e:headed` — Run tests in headed browser mode
- `npm run e2e:ui` — Open Playwright UI mode for interactive debugging
- `npm run e2e:report` — Open the HTML test report
- `npm run e2e:install` — Install Playwright browsers

Run a specific file:

```bash
npx playwright test e2e/specs/auth/login.spec.ts
```

Run tests matching a title:

```bash
npx playwright test --grep "should login"
```

## 5. Architecture
- **Page Object Model (POM):** Each page has a corresponding POM in `e2e/pages/` that encapsulates selectors and actions.
- **Fixtures:** Custom Playwright fixtures in `e2e/fixtures/` provide POM instances and helpers such as API mocking.
- **API Mocking:** Tests use `page.route()` to intercept API calls (for example, `POST /api/auth/login`) for deterministic behavior without a backend.
- **Auth State Seeding:** `setupAuthenticatedState` seeds local storage auth values so tests can access authenticated routes without logging in through the UI.

## 6. Writing New Tests
- Create spec files in `e2e/specs/{feature}/`.
- For auth-related tests, import `test` and `expect` from `e2e/fixtures/auth.fixture`.
- For general tests, import from `@playwright/test`.
- Create a new POM in `e2e/pages/` for each new page/feature surface.
- Prefer role-based locators first (`getByRole`, `getByLabel`) for resilience and accessibility alignment.

## 7. Configuration
Playwright is configured in `playwright.config.ts` at the project root.

Current setup includes:
- Browsers: Chromium, Firefox, WebKit
- Auto-start Angular dev server through `webServer`
- Trace collection on first retry (`trace: 'on-first-retry'`) for failure debugging

## 8. Known Gaps
- The `/dashboard` route does not currently have `canActivate: [authGuard]` in `src/app/app.routes.ts`. The redirect route-guard test is marked as `test.fixme()` until that is added.
- `AuthService.logout()` does not navigate. E2E logout tests currently verify auth state clearing only.
