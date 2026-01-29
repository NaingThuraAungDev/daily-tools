# Copilot Instructions for Daily Tools Angular 20

## Project Overview
**Daily Tools** is a production-ready Angular 20 application using standalone components, Angular Signals for state management, and RxJS for async operations. The architecture follows feature-based organization with singleton core services.

### Key Stack
- Angular 20 (standalone API, no NgModules)
- TypeScript 5+ (strict mode enabled)
- Angular Signals + RxJS (Observables)
- Functional route guards + lazy-loaded features
- Karma/Jasmine for testing
- SCSS with global variables in `src/styles/`

---

## Architecture Patterns

### Folder Structure & Responsibilities

**`core/`** - App-wide singletons (never lazy-loaded)
- **`services/`**: `AuthService` (Signals-based state), `ApiService` (HTTP wrapper), `StorageService` (localStorage)
- **`interceptors/`**: HTTP interceptors for auth token injection, error handling, and loading states
- **`guards/`**: Functional route guards (e.g., `authGuard` protects authenticated routes)
- **`models/`**: Shared interfaces (e.g., `User`, `LoginRequest`)

**`features/`** - Feature modules with lazy-loaded routes
- Each feature has routes (`auth.routes.ts`), state store (`auth.store.ts`), and pages
- Example: `auth/pages/login.page.ts`, `dashboard/pages/dashboard.page.ts`
- Features are loaded on-demand via `loadChildren` in root routes

**`shared/`** - Reusable components, directives, pipes
- Standalone components with no dependency on feature-specific state
- Example: `button.component.ts` is a dumb, presentational component

**`styles/`** - Global SCSS
- `_variables.scss` contains color palette, typography, spacing (imported first)
- `styles.scss` contains base resets and global styles

### Data Flow & State Management

1. **Component Layer**: Inject services, call methods, bind Signals to templates
   ```typescript
   export class LoginComponent {
     private authService = inject(AuthService);
     isLoading = signal(false);
     
     onLogin(credentials: LoginRequest) {
       this.isLoading.set(true);
       this.authService.login(credentials).subscribe({
         next: () => router.navigate(['/dashboard']),
         error: () => this.isLoading.set(false),
       });
     }
   }
   ```

2. **Service Layer** (Core): Manages state with Signals + BehaviorSubjects for observables
   ```typescript
   // AuthService example
   public readonly isAuthenticated = signal(false);
   public readonly currentUser = signal<User | null>(null);
   
   public login(credentials): Observable<LoginResponse> {
     return this.http.post(...).pipe(
       tap(response => {
         this.currentUser.set(response.user);
         this.isAuthenticated.set(true);
       })
     );
   }
   ```

3. **HTTP Layer**: All requests go through `ApiService` or directly via `HttpClient`
   - Interceptors automatically add auth tokens, handle errors, manage loading state
   - Feature-specific HTTP calls should be in feature services or components

---

## Development Workflows

### Getting Started
```bash
npm install              # Install dependencies
npm start               # Start dev server on http://localhost:4200
npm test                # Run Karma/Jasmine tests
npm run test:coverage   # Generate coverage report
npm run lint            # Run ESLint
npm run format          # Run Prettier
```

### Adding a New Feature
1. Create folder in `src/app/features/{feature-name}/`
2. Add `{feature-name}.routes.ts` with feature routes
3. Create `pages/` subfolder with components
4. Export `{FEATURE_NAME}_ROUTES` constant from routes file
5. Reference in `app.routes.ts` with `loadChildren`

**Example: New "reports" feature**
```typescript
// app.routes.ts
{
  path: 'reports',
  canActivate: [authGuard],
  loadChildren: () => import('./features/reports/reports.routes').then(m => m.REPORTS_ROUTES)
}

// features/reports/reports.routes.ts
export const REPORTS_ROUTES: Routes = [
  { path: '', component: ReportsPageComponent },
];
```

### Adding a New Core Service
1. Create in `src/app/core/services/{name}.service.ts`
2. Decorate with `@Injectable({ providedIn: 'root' })`
3. Use Signals for state, Observables for async operations
4. Create spec file and add unit tests

---

## Code Conventions

### Signals vs Observables
- **Signals**: Component local state, service state (synchronous reading)
- **Observables**: HTTP requests, event streams, async operations with operators (use in subscribe)

### Component Structure
- All components are **standalone**: `standalone: true`
- Import only what's used (no barrel imports unless in shared)
- Use `OnPush` change detection where possible
- Prefer Signals over lifecycle hooks for state updates

### Service Patterns
- Singleton services in `core/` use `providedIn: 'root'`
- Feature services use `providedIn` with feature name (if needed for scoping)
- Always initialize auth state in constructor (see `AuthService.initializeAuth()`)
- Use `tap()` operator in RxJS to sync Signals with Observable responses

### Testing
- **Test Framework**: Jasmine (via Karma)
- **Spec files**: Place `*.spec.ts` next to component/service
- **Pattern**: Arrange → Act → Assert
- **Example**: See `src/app/core/services/auth.service.spec.ts`

---

## Critical Paths & Integration Points

### Authentication Flow
1. User logs in on `/auth/login` (unauthenticated route)
2. `AuthService.login()` sends credentials, receives token + user
3. Token stored in localStorage, Signals updated (`isAuthenticated`, `currentUser`)
4. `authGuard` checks `isAuthenticated` signal; redirects to login if false
5. All HTTP requests include token via `authInterceptor`
6. Token refresh/expiration handled in `errorInterceptor`

### Routing Hierarchy
- Root: `app.routes.ts` (redirects to dashboard, protects dashboard with authGuard)
- Auth feature: Unprotected `/auth/login` route
- Dashboard feature: Protected `/dashboard` route (lazy-loaded after login)
- Catch-all `**` redirects to dashboard

### Error Handling
- **HTTP Errors**: Caught in `errorInterceptor`, logged, can trigger logout on 401
- **Component Errors**: Subscribe to `.pipe(catchError())` in components
- **Validation**: Use `@angular/forms` Validators in Reactive Forms

---

## Common Pitfalls & How to Avoid Them

1. **Forgetting `standalone: true`**: All new components must be standalone
2. **Breaking the feature boundary**: Don't import feature components into other features; use shared components instead
3. **Mixing Signals and Observables inconsistently**: Use Signals for state reading in templates; subscribe only when side effects are needed
4. **Not updating tests when adding features**: Always add `*.spec.ts` alongside new components/services
5. **Ignoring the auth token lifecycle**: Ensure `authInterceptor` and `errorInterceptor` handle token refresh

---

## File References
- **Entry point**: [src/main.ts](../src/main.ts)
- **App config**: [src/app/app.config.ts](../src/app/app.config.ts)
- **Root routes**: [src/app/app.routes.ts](../src/app/app.routes.ts)
- **Auth service**: [src/app/core/services/auth.service.ts](../src/app/core/services/auth.service.ts)
- **Auth guard**: [src/app/core/guards/auth.guard.ts](../src/app/core/guards/auth.guard.ts)
- **Global styles**: [src/styles/](../src/styles/)
