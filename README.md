# Daily Tools - Production-Ready Angular 20 Application

A modern, feature-rich Angular 20 application demonstrating best practices in enterprise-level web development. Built with standalone components, Angular Signals, and a scalable feature-based architecture.

---

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Project Structure](#project-structure)
3. [Architectural Decisions](#architectural-decisions)
4. [Running, Building, and Testing](#running-building-and-testing)
5. [Key Features](#key-features)
6. [Contributing](#contributing)
7. [License](#license)

---

## Setup Instructions

### Prerequisites

- **Node.js**: v20.0.0 or higher
- **npm**: v10.0.0 or higher (or yarn/pnpm)
- **Angular CLI**: v20.0.0 (will be installed via npm)

### Installation Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd daily-tools
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   Or with yarn:
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   The application will be available at `http://localhost:4200`

4. **Access the application:**
   - Open your browser and navigate to `http://localhost:4200`
   - You'll be redirected to the login page
   - Use demo credentials to log in (backend implementation required)

---

## Project Structure

```
daily-tools/
├── src/
│   ├── app/
│   │   ├── core/                          # App-wide singleton services & logic
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts    # Adds JWT token to requests
│   │   │   │   ├── error.interceptor.ts   # Centralized error handling
│   │   │   │   └── loading.interceptor.ts # Global loading state management
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts          # Protects authenticated routes
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts         # Generic HTTP client wrapper
│   │   │   │   ├── auth.service.ts        # Authentication logic & state
│   │   │   │   └── storage.service.ts     # localStorage/sessionStorage wrapper
│   │   │   └── models/
│   │   │       └── user.model.ts          # Shared user interfaces
│   │   │
│   │   ├── shared/                        # Reusable components & utilities
│   │   │   ├── components/
│   │   │   │   └── button/                # Reusable button component
│   │   │   │       ├── button.component.ts
│   │   │   │       └── button.component.scss
│   │   │   ├── directives/                # Placeholder for custom directives
│   │   │   └── pipes/                     # Placeholder for custom pipes
│   │   │
│   │   ├── features/                      # Business logic features (lazy-loaded)
│   │   │   ├── auth/
│   │   │   │   ├── pages/
│   │   │   │   │   └── login.page.ts      # Login page component
│   │   │   │   ├── auth.routes.ts         # Feature routes
│   │   │   │   └── auth.store.ts          # Feature state management (Signals)
│   │   │   │
│   │   │   └── dashboard/
│   │   │       ├── pages/
│   │   │       │   ├── dashboard.page.ts  # Main dashboard page
│   │   │       │   └── dashboard.page.scss
│   │   │       ├── dashboard.routes.ts    # Feature routes
│   │   │       └── dashboard.store.ts     # Feature state management
│   │   │
│   │   ├── app.routes.ts                  # Root application routes
│   │   ├── app.component.ts               # Root component
│   │   └── app.config.ts                  # Application configuration & providers
│   │
│   ├── environments/
│   │   ├── environment.ts                 # Development environment
│   │   └── environment.prod.ts            # Production environment
│   │
│   ├── styles/
│   │   ├── _variables.scss                # Global SCSS variables & mixins
│   │   └── styles.scss                    # Global styles
│   │
│   ├── index.html                         # Main HTML template
│   └── main.ts                            # Application bootstrap
│
├── angular.json                           # Angular CLI configuration
├── tsconfig.json                          # TypeScript configuration (strict mode)
├── tsconfig.app.json                      # TypeScript app-specific config
├── tsconfig.spec.json                     # TypeScript test-specific config
├── karma.conf.js                          # Test runner configuration
├── .eslintrc.json                         # ESLint configuration
├── .prettierrc                            # Prettier formatting configuration
├── package.json                           # Project dependencies
└── README.md                              # This file
```

### Folder Purpose Guide

- **core/**: Singleton services, guards, interceptors, and shared models. Provided at the root level.
- **shared/**: Reusable UI components, directives, and pipes that can be imported across features.
- **features/**: Feature modules (lazy-loaded) that contain page components, routing, and feature-specific state.
- **styles/**: Global SCSS variables, mixins, and base styles.
- **environments/**: Environment-specific configuration.

---

## Architectural Decisions

### 1. Standalone Components

**Decision**: All components use Angular 20's standalone API (no NgModules)

**Benefit**: 
- Simpler mental model and fewer boilerplate files
- Smaller bundle size
- Explicit dependency management at component level
- Better tree-shaking optimization

**Implementation**:
```typescript
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `...`,
})
export class LoginComponent { }
```

---

### 2. Angular Signals for State Management

**Decision**: Use Angular Signals as the primary state mechanism instead of pure RxJS observables

**Benefit**:
- Fine-grained reactivity with automatic dependency tracking
- Better performance through granular updates
- Simpler syntax for component state
- Reduced boilerplate compared to BehaviorSubjects

**Implementation**:
```typescript
export class AuthService {
  public readonly isAuthenticated = signal(false);
  public readonly currentUser = signal<User | null>(null);
  
  // Update state
  this.isAuthenticated.set(true);
}
```

**Usage in components**:
```typescript
public isLoading = () => this.store.state().isLoading;
// Signals are automatically tracked by Angular's change detection
```

---

### 3. RxJS Only for Async Streams

**Decision**: Reserve RxJS for HTTP calls, events, and true async streams. Use Signals for synchronous state.

**Benefit**:
- Clear separation of concerns
- RxJS handles async operations where it excels
- Signals handle local component state efficiently
- Reduced overall complexity

**Implementation**:
- HTTP calls use RxJS observables
- Form value changes are observed with RxJS
- Component state uses Signals
- Services expose both Signals and RxJS observables

---

### 4. Feature-Based Architecture

**Decision**: Organize code by business features, not technical layers

**Benefit**:
- Code organization scales with business needs
- Feature teams can work independently
- Easier to reason about feature dependencies
- Simple feature addition/removal

**Example**: `features/auth/`, `features/dashboard/`

Each feature contains:
- Pages (smart components)
- Routing configuration
- Feature-specific state (store)

---

### 5. Lazy-Loaded Routes

**Decision**: Each feature is lazy-loaded via Angular Router

**Benefit**:
- Faster initial load time
- Smaller initial bundle
- Features loaded on-demand
- Better performance for large applications

**Implementation**:
```typescript
{
  path: 'auth',
  loadChildren: () =>
    import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
}
```

---

### 6. Strict TypeScript Mode

**Decision**: Enable `strict: true` in tsconfig.json

**Benefit**:
- Catches type errors at compile time
- Safer code with better IDE support
- Enforces `noImplicitAny`, `strictNullChecks`, etc.
- Reduces runtime errors

**Configuration**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

---

### 7. HTTP Interceptors

**Decision**: Global HTTP interceptors for authentication, error handling, and loading state

#### Auth Interceptor
- Automatically adds JWT token to all requests
- Reads token from AuthService

#### Error Interceptor
- Centralized error handling
- Can implement retry logic, token refresh, or user notifications

#### Loading Interceptor
- Tracks global loading state
- Can trigger loading indicators in the app

**Implementation**:
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(clonedRequest);
  }
  return next(req);
};

// Provided in app.config.ts
provideHttpClient(
  withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])
)
```

---

### 8. Environment Configuration

**Decision**: Separate environment files for development and production

**Benefit**:
- Different API URLs, feature flags, logging levels
- Build-time configuration
- No manual changes needed for deployments

**Files**:
- `environment.ts` - Development (default)
- `environment.prod.ts` - Production

**Usage**:
```typescript
import { environment } from '@environments/environment';

export class ApiService {
  private baseUrl = environment.apiUrl;
}
```

---

### 9. Centralized Error Handling

**Decision**: Implement error handling at the HTTP interceptor level and service layer

**Benefit**:
- Consistent error responses across the application
- Single place to handle logging, user notifications
- Automatic token refresh logic possible
- Cleaner component code

**Implementation**:
- Error interceptor catches HTTP errors
- Services can provide error handlers
- Components pass error handlers to service calls

---

### 10. Route Guards (Auth + Role-Based)

**Decision**: Use functional route guards to protect routes

**Benefit**:
- Declarative protection
- Testable guards
- Simple syntax with `inject()`

**Implementation**:
```typescript
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};

// Usage in routes
{
  path: 'dashboard',
  canActivate: [authGuard],
  loadChildren: () => ...,
}
```

---

### 11. SCSS Styling Approach

**Decision**: Use SCSS with global variables, mixins, and a component-scoped strategy

**Benefit**:
- Reusable styles through variables and mixins
- Component scoping prevents style conflicts
- Maintainable color schemes and spacing
- Easier theming support

**Structure**:
- `_variables.scss` - Global colors, spacing, mixins
- `styles.scss` - Base/reset styles
- Component `.scss` files - Component-specific styles

---

### 12. Shared Components Strategy

**Decision**: Build reusable UI components in `shared/components/`

**Benefit**:
- DRY principle
- Consistent UI across features
- Easier theme changes
- Testable components

**Example**: `button.component.ts` with variant support

---

## Running, Building, and Testing

### Development Server

**Start the development server:**
```bash
npm start
```

- Runs `ng serve --host 0.0.0.0 --port 4200`
- Accessible at `http://localhost:4200`
- Hot-reload enabled for changes

**Stop the server:**
- Press `Ctrl + C` in the terminal

---

### Production Build

**Build for production:**
```bash
npm run build:prod
```

- Runs `ng build --configuration production`
- Outputs to `dist/daily-tools/`
- Minified, optimized bundle
- Source maps excluded by default

**Serve the production build locally:**
```bash
npx http-server dist/daily-tools -p 8080
```

---

### Unit Testing

**Run tests once:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm test -- --watch
```

**Generate code coverage:**
```bash
npm run test:coverage
```
- Coverage report in `coverage/daily-tools/index.html`

**Testing Framework**: Jasmine + Karma

**Test File Organization**:
- Test files end with `.spec.ts`
- Located alongside source files
- One test file per component/service

**Example Test Structure**:
```typescript
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should authenticate user', () => {
    // Test implementation
  });
});
```

---

### Linting & Code Quality

**Run ESLint:**
```bash
npm run lint
```

**Fix ESLint issues automatically:**
```bash
npm run lint:fix
```

**Format code with Prettier:**
```bash
npm run format
```

**Check formatting without changes:**
```bash
npm run format:check
```

**ESLint Configuration**:
- Angular-specific rules via `@angular-eslint`
- TypeScript strict rules via `@typescript-eslint`
- Template linting for components

**Prettier Configuration**:
- Print width: 100 characters
- 2-space indentation
- Single quotes for strings
- Trailing commas in ES5

---

## Key Features

✅ **Standalone Components** - Modern Angular architecture without NgModules

✅ **Angular Signals** - Fine-grained reactivity for state management

✅ **Feature-Based Architecture** - Scalable, modular organization

✅ **Lazy-Loaded Routes** - Optimized bundle sizes and initial load time

✅ **HTTP Interceptors** - Centralized auth, error handling, and loading state

✅ **Authentication Service** - Complete login/logout flow with token management

✅ **Route Guards** - Protect authenticated routes

✅ **SCSS Styling** - Global variables, mixins, and component-scoped styles

✅ **Strict TypeScript** - Enforced type safety

✅ **Unit Testing** - Test files for services and components

✅ **ESLint & Prettier** - Code quality and formatting

✅ **Responsive Design** - Mobile-friendly UI components

### Technology Stack

- **Framework**: Angular 20
- **Language**: TypeScript 5.5
- **Styling**: SCSS
- **HTTP Client**: Angular HttpClient
- **State Management**: Angular Signals + RxJS
- **Routing**: Angular Router with lazy loading
- **Testing**: Jasmine + Karma
- **Linting**: ESLint + Angular ESLint
- **Formatting**: Prettier

---

## Contributing

### Adding a New Feature

1. **Create a feature folder:**
   ```bash
   mkdir -p src/app/features/my-feature/pages
   mkdir -p src/app/features/my-feature/components
   ```

2. **Follow the structure:**
   - `pages/` - Smart components (pages)
   - `components/` - Feature-specific components
   - `my-feature.store.ts` - Feature state
   - `my-feature.routes.ts` - Feature routing
   - `models/` - Feature-specific interfaces (if needed)

3. **Create standalone components:**
   ```typescript
   @Component({
     selector: 'app-my-component',
     standalone: true,
     imports: [CommonModule, ...],
     template: `...`,
   })
   export class MyComponent { }
   ```

4. **Add lazy-loaded route:**
   ```typescript
   {
     path: 'my-feature',
     loadChildren: () =>
       import('./features/my-feature/my-feature.routes').then((m) => m.MY_FEATURE_ROUTES),
   }
   ```

5. **Write unit tests:**
   - Create `.spec.ts` file next to your component
   - Test component/service behavior

6. **Run tests and linting:**
   ```bash
   npm test
   npm run lint:fix
   npm run format
   ```

### Guidelines

- Always use standalone components
- Keep components focused and small
- Use Signals for component state
- Use RxJS only for async operations
- Follow the established folder structure
- Write meaningful unit tests
- Format code with Prettier before committing
- Follow ESLint rules

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server |
| `npm run build:prod` | Build for production |
| `npm test` | Run unit tests |
| `npm run test:coverage` | Generate test coverage |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues |
| `npm run format` | Format code |

---

**Happy coding! 🚀**
