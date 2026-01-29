# 🚀 Daily Tools - Angular 20 Project Documentation Index

Welcome to the Daily Tools project! This is a production-ready Angular 20 application built with modern best practices.

## 📚 Documentation Guide

### **Start Here**
1. **[README.md](README.md)** - 📖 Main project documentation
   - Setup instructions
   - Project overview
   - Architectural decisions
   - Running, building, and testing
   - Contributing guidelines

### **Project Structure**
2. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - 🗂️ Visual directory tree
   - Complete folder hierarchy
   - File organization by layer
   - File statistics
   - Key technologies

3. **[PROJECT_SETUP_SUMMARY.md](PROJECT_SETUP_SUMMARY.md)** - ✅ Completion checklist
   - All created files and directories
   - Features implemented
   - Quick start commands
   - Next steps

### **Development**
4. **[DEVELOPMENT.md](DEVELOPMENT.md)** - 💻 Development guidelines
   - Key concepts and patterns
   - Code examples
   - Common issues & solutions
   - File naming conventions
   - Performance tips
   - Testing guidelines

## 🎯 Quick Navigation

### By Use Case

**I want to...**

- **Get started quickly**
  1. Read: [README.md - Setup Instructions](README.md#setup-instructions)
  2. Run: `npm install && npm start`
  3. Open: `http://localhost:4200`

- **Understand the architecture**
  1. Read: [README.md - Architectural Decisions](README.md#architectural-decisions)
  2. Check: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
  3. Review: [DEVELOPMENT.md](DEVELOPMENT.md)

- **Add a new feature**
  1. Follow: [README.md - Contributing](README.md#contributing)
  2. Reference: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
  3. Use: Examples from `src/app/features/auth/` or `src/app/features/dashboard/`

- **Write tests**
  1. Review: [DEVELOPMENT.md - Testing Guidelines](DEVELOPMENT.md#testing-guidelines)
  2. See examples in: `src/app/**/*.spec.ts`
  3. Run: `npm test`

- **Deploy to production**
  1. Run: `npm run build:prod`
  2. Deploy: Contents of `dist/daily-tools/`
  3. Configure: Environment variables in `src/environments/environment.prod.ts`

## 📁 Project Structure Overview

```
src/app/
├── core/          👉 Singleton services, guards, interceptors
├── shared/        👉 Reusable components, directives, pipes
├── features/      👉 Business features (auth, dashboard)
└── styles/        👉 Global SCSS variables and styles
```

## 🔑 Key Concepts

| Concept | File | Purpose |
|---------|------|---------|
| **Authentication** | `src/app/core/services/auth.service.ts` | User login, logout, token management |
| **State** | `src/app/features/*/store.ts` | Feature state using Angular Signals |
| **API Calls** | `src/app/core/services/api.service.ts` | Generic HTTP wrapper |
| **Routing** | `src/app/app.routes.ts` | Root routes with lazy loading |
| **Guards** | `src/app/core/guards/auth.guard.ts` | Route protection |
| **Interceptors** | `src/app/core/interceptors/` | Auth, error, loading handlers |
| **Styling** | `src/styles/_variables.scss` | Global colors, spacing, mixins |

## 📋 NPM Commands

```bash
# Development
npm start              # Start dev server on port 4200
npm test               # Run unit tests
npm test -- --watch   # Run tests in watch mode

# Production
npm run build:prod     # Build optimized production bundle
npm run test:coverage  # Generate code coverage report

# Code Quality
npm run lint           # Check code with ESLint
npm run lint:fix       # Fix ESLint issues automatically
npm run format         # Format code with Prettier
npm run format:check   # Check if formatting is needed
```

## 🛠️ Technology Stack

- **Framework**: Angular 20 (Standalone API)
- **Language**: TypeScript 5.5 (Strict Mode)
- **Styling**: SCSS with variables and mixins
- **State**: Angular Signals + RxJS observables
- **Testing**: Jasmine + Karma
- **Linting**: ESLint + Prettier
- **HTTP**: Angular HttpClient with interceptors

## 📈 Architecture Highlights

### Standalone Components
All components use the modern standalone API - no NgModules!

### Signals for State
Use Angular Signals for component and feature state management.

### RxJS for Async
Reserve RxJS for HTTP calls, events, and async streams.

### Feature-Based Organization
Code is organized by business features, not technical layers.

### Lazy-Loaded Routes
Features are lazy-loaded on-demand for better performance.

### Strict TypeScript
Full type safety with strict mode enabled.

### Interceptors
Global HTTP interceptors handle authentication, errors, and loading state.

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open in browser**
   ```
   http://localhost:4200
   ```

4. **Login** (when backend is ready)
   - The app redirects to login page
   - Implement your backend API based on `src/app/core/models/user.model.ts`

## 🎓 Learning Path

1. **Day 1**: Review README.md and PROJECT_STRUCTURE.md
2. **Day 2**: Explore the `auth` feature in `src/app/features/auth/`
3. **Day 3**: Explore the `dashboard` feature in `src/app/features/dashboard/`
4. **Day 4**: Add a new feature following the existing patterns
5. **Day 5**: Write tests for your feature

## 📞 Common Questions

**Q: Where should I add a new API call?**
A: Add to `src/app/core/services/api.service.ts` or create a feature-specific service.

**Q: How do I manage component state?**
A: Use Angular Signals in component or feature store (`.store.ts`).

**Q: How are async operations handled?**
A: Use RxJS observables for HTTP calls and streams.

**Q: Where do I add global styling?**
A: Add to `src/styles/_variables.scss` or `src/styles/styles.scss`.

**Q: How do I protect routes?**
A: Use route guards like `authGuard` in `src/app/core/guards/auth.guard.ts`.

## 🔗 Related Files

- **Authentication Logic**: `src/app/core/services/auth.service.ts`
- **Login Page**: `src/app/features/auth/pages/login.page.ts`
- **Dashboard Page**: `src/app/features/dashboard/pages/dashboard.page.ts`
- **Route Configuration**: `src/app/app.routes.ts`
- **Styling Variables**: `src/styles/_variables.scss`
- **Environment Config**: `src/environments/environment.ts`

## ✅ Completion Checklist

- [x] Project structure created
- [x] Standalone components set up
- [x] Angular Signals state management
- [x] Feature-based architecture
- [x] Lazy-loaded routes
- [x] HTTP interceptors
- [x] Route guards
- [x] SCSS styling
- [x] Unit test setup
- [x] ESLint + Prettier configuration
- [x] Comprehensive documentation

## 📚 Additional Resources

- [Angular Official Documentation](https://angular.dev)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [ESLint Rules](https://eslint.org/docs/rules)

---

## 📝 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | Main project documentation |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Visual directory tree |
| [PROJECT_SETUP_SUMMARY.md](PROJECT_SETUP_SUMMARY.md) | Setup completion summary |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Development guidelines |
| [INDEX.md](INDEX.md) | This file |

---

**Happy coding! 🚀**

Last updated: January 29, 2026
Angular Version: 20
TypeScript Version: 5.5
