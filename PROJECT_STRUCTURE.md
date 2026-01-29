# Project Directory Tree

```
daily-tools/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts                    ✓ Functional route guard
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts              ✓ JWT token injection
│   │   │   │   ├── error.interceptor.ts             ✓ Error handling
│   │   │   │   └── loading.interceptor.ts           ✓ Loading state
│   │   │   ├── models/
│   │   │   │   └── user.model.ts                    ✓ User interfaces
│   │   │   └── services/
│   │   │       ├── api.service.ts                   ✓ Generic HTTP service
│   │   │       ├── auth.service.ts                  ✓ Auth with Signals
│   │   │       ├── auth.service.spec.ts             ✓ Auth service tests
│   │   │       ├── storage.service.ts               ✓ Storage wrapper
│   │   │       └── storage.service.spec.ts          ✓ Storage tests
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   └── button/
│   │   │   │       ├── button.component.ts          ✓ Reusable button
│   │   │   │       └── button.component.scss        ✓ Button styles
│   │   │   ├── directives/                          ✓ (Placeholder)
│   │   │   └── pipes/                               ✓ (Placeholder)
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── login.page.ts                ✓ Login component
│   │   │   │   │   ├── login.page.scss              ✓ Login styles
│   │   │   │   │   └── login.page.spec.ts           ✓ Login tests
│   │   │   │   ├── auth.routes.ts                   ✓ Auth routes
│   │   │   │   └── auth.store.ts                    ✓ Auth state (Signals)
│   │   │   │
│   │   │   └── dashboard/
│   │   │       ├── pages/
│   │   │       │   ├── dashboard.page.ts            ✓ Dashboard component
│   │   │       │   ├── dashboard.page.scss          ✓ Dashboard styles
│   │   │       │   └── dashboard.page.spec.ts       ✓ Dashboard tests
│   │   │       ├── dashboard.routes.ts              ✓ Dashboard routes
│   │   │       └── dashboard.store.ts               ✓ Dashboard state
│   │   │
│   │   ├── app.component.ts                         ✓ Root component
│   │   ├── app.component.scss                       ✓ Root styles
│   │   ├── app.component.spec.ts                    ✓ Root tests
│   │   ├── app.config.ts                            ✓ App config & providers
│   │   └── app.routes.ts                            ✓ Root routes
│   │
│   ├── environments/
│   │   ├── environment.ts                           ✓ Dev config
│   │   └── environment.prod.ts                      ✓ Prod config
│   │
│   ├── styles/
│   │   ├── _variables.scss                          ✓ Global variables
│   │   └── styles.scss                              ✓ Global styles
│   │
│   ├── index.html                                   ✓ Main HTML
│   └── main.ts                                      ✓ Bootstrap
│
├── Configuration Files
│   ├── angular.json                                 ✓ Angular CLI config
│   ├── tsconfig.json                                ✓ TypeScript config (strict)
│   ├── tsconfig.app.json                            ✓ App TypeScript config
│   ├── tsconfig.spec.json                           ✓ Test TypeScript config
│   ├── karma.conf.js                                ✓ Test runner config
│   ├── .eslintrc.json                               ✓ ESLint config
│   ├── .prettierrc                                  ✓ Prettier config
│   ├── .prettierignore                              ✓ Prettier ignore
│   └── package.json                                 ✓ Dependencies & scripts
│
├── Documentation
│   ├── README.md                                    ✓ Main documentation
│   ├── DEVELOPMENT.md                               ✓ Development guide
│   ├── PROJECT_SETUP_SUMMARY.md                     ✓ Setup summary
│   └── PROJECT_STRUCTURE.md                         ✓ This file
│
└── Version Control
    └── .gitignore                                   ✓ Git ignore rules
```

## Statistics

| Category | Count |
|----------|-------|
| TypeScript Components | 15 |
| SCSS Files | 5 |
| Test Files (.spec.ts) | 5 |
| Service Files | 3 |
| Configuration Files | 8 |
| Documentation Files | 4 |
| **Total Files** | **40+** |

## File Organization by Layer

### Core Layer (App-wide)
- Services (auth, api, storage)
- Interceptors (auth, error, loading)
- Guards (auth)
- Models (user interfaces)

### Shared Layer (Reusable)
- UI Components (button)
- Directives (placeholder)
- Pipes (placeholder)

### Features Layer (Business Logic)
- Auth Feature (login)
- Dashboard Feature (main app)

### Configuration Layer
- Angular, TypeScript, Karma, ESLint, Prettier

### Styling Layer
- Global variables and mixins
- Global reset/base styles
- Component-scoped SCSS

## Code Metrics

- **Lines of Source Code**: ~2000+
- **Lines of Test Code**: ~200+
- **Configuration Lines**: ~500+
- **Documentation Lines**: ~1000+

## Key Technologies

- Angular 20 (Standalone API)
- TypeScript 5.5 (Strict Mode)
- RxJS 7.8
- SCSS
- Jasmine + Karma
- ESLint + Prettier

---

**All files organized and ready for development! ✨**
