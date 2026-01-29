# Post-Setup Checklist

After the Angular 20 project has been scaffolded, follow these steps to prepare for development.

## ✅ Pre-Installation Setup

- [ ] Verify Node.js v20+ is installed: `node --version`
- [ ] Verify npm v10+ is installed: `npm --version`
- [ ] Navigate to project directory: `cd daily-tools`

## ✅ Installation Phase

```bash
npm install
```

- [ ] Dependencies installed successfully
- [ ] No major security vulnerabilities in `npm audit`
- [ ] All peer dependencies resolved

## ✅ Project Verification

```bash
npm start
```

- [ ] Development server starts on `http://localhost:4200`
- [ ] No compilation errors in terminal
- [ ] Browser opens with the app
- [ ] Application renders without errors
- [ ] Angular logo/app content visible

## ✅ Code Quality Setup

```bash
npm run lint
npm run format
```

- [ ] ESLint check passes
- [ ] Code is properly formatted
- [ ] No formatting issues reported

## ✅ Testing Setup

```bash
npm test
```

- [ ] Karma test runner starts
- [ ] Chrome browser opens for tests
- [ ] Existing tests pass
- [ ] Test output shows results

## ✅ Build Verification

```bash
npm run build:prod
```

- [ ] Production build completes successfully
- [ ] Output in `dist/daily-tools/` directory
- [ ] Bundle size is reasonable
- [ ] No critical build warnings

## ✅ Documentation Review

- [ ] [README.md](README.md) - Read setup and architecture sections
- [ ] [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Understand folder organization
- [ ] [DEVELOPMENT.md](DEVELOPMENT.md) - Review development patterns
- [ ] [INDEX.md](INDEX.md) - Bookmark for quick reference

## ✅ IDE Configuration

### VS Code
- [ ] Install Angular Language Service extension
- [ ] Install ESLint extension
- [ ] Install Prettier extension
- [ ] Enable `editor.formatOnSave` in settings

### Settings (`.vscode/settings.json`)
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "angular.enable-strict-mode-prompt": false
}
```

- [ ] Settings configured
- [ ] Extensions installed
- [ ] Auto-format working

## ✅ Git Setup

```bash
git init
git add .
git commit -m "Initial Angular 20 project setup"
```

- [ ] Git repository initialized
- [ ] Initial commit created
- [ ] `.gitignore` applied correctly
- [ ] No sensitive files in git

## ✅ Environment Configuration

### Development Environment (`src/environments/environment.ts`)
- [ ] API URL set to development server
- [ ] Logging enabled
- [ ] Feature flags configured

### Production Environment (`src/environments/environment.prod.ts`)
- [ ] API URL points to production API
- [ ] Logging disabled or minimal
- [ ] Feature flags configured for production

## ✅ Backend Integration Preparation

- [ ] Review `src/app/core/services/auth.service.ts`
- [ ] Review login page at `src/app/features/auth/pages/login.page.ts`
- [ ] Understand the expected API responses in `src/app/core/models/user.model.ts`
- [ ] Plan API endpoints that match service expectations

### Required API Endpoints
- [ ] `POST /auth/login` - Authentication endpoint
- [ ] Response format matches `LoginResponse` interface
- [ ] Error handling implemented

## ✅ Feature Development Preparation

- [ ] Create feature folder structure
- [ ] Copy pattern from `auth` or `dashboard` feature
- [ ] Create `.store.ts` for feature state
- [ ] Create `.routes.ts` for feature routing
- [ ] Create page components in `pages/` folder
- [ ] Add to root routes in `app.routes.ts`

## ✅ Testing Strategy

- [ ] Add unit tests for each service
- [ ] Add component tests for pages
- [ ] Aim for >80% code coverage
- [ ] Run: `npm run test:coverage`

## ✅ Code Quality Standards

- [ ] Follow naming conventions (see DEVELOPMENT.md)
- [ ] Run linter before commits: `npm run lint:fix`
- [ ] Format code before commits: `npm run format`
- [ ] Write meaningful commit messages
- [ ] Keep components small and focused

## ✅ Pre-Commit Checklist

Before pushing code:
- [ ] Tests pass: `npm test`
- [ ] Build succeeds: `npm run build:prod`
- [ ] No linting errors: `npm run lint`
- [ ] Code is formatted: `npm run format`
- [ ] No console errors
- [ ] No console warnings (if possible)

## ✅ Optional Enhancements

- [ ] Set up GitHub Actions for CI/CD
- [ ] Configure pre-commit hooks (husky + lint-staged)
- [ ] Set up code coverage reporting
- [ ] Configure deployment pipeline
- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics
- [ ] Set up logging service

### Install Husky + Lint-Staged
```bash
npm install -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "**/*.{ts,html,scss,json}": "prettier --write",
    "**/*.ts": "eslint --fix"
  }
}
```

## ✅ Deployment Preparation

- [ ] Set up environment-specific configurations
- [ ] Configure build optimization settings
- [ ] Plan deployment strategy
- [ ] Set up monitoring/logging in production
- [ ] Plan error handling and user feedback
- [ ] Set up analytics
- [ ] Configure CORS for API

## ✅ Documentation Update

- [ ] Update README with your specific setup
- [ ] Document API endpoints
- [ ] Document authentication flow
- [ ] Add feature documentation
- [ ] Update DEVELOPMENT.md with team standards

## ✅ Team Onboarding

- [ ] Share documentation with team
- [ ] Conduct architecture walkthrough
- [ ] Review coding standards
- [ ] Set up pair programming sessions
- [ ] Answer team questions

## 🎯 Success Criteria

- ✅ App runs without errors: `npm start`
- ✅ Tests pass: `npm test`
- ✅ Build succeeds: `npm run build:prod`
- ✅ Code quality checks pass: `npm run lint`
- ✅ All documentation reviewed
- ✅ Team understands architecture
- ✅ Ready for feature development

---

## Troubleshooting

### Port 4200 already in use
```bash
npm start -- --port 4300
```

### Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Angular cache
```bash
rm -rf .angular
npm start
```

### Build issues
```bash
npm run build:prod -- --verbose
```

### Test timeout issues
```bash
npm test -- --browsers=Chrome --poll=2000
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm start` |
| Run tests | `npm test` |
| Build for prod | `npm run build:prod` |
| Check linting | `npm run lint` |
| Fix linting | `npm run lint:fix` |
| Format code | `npm run format` |
| Test coverage | `npm run test:coverage` |

---

**Estimated Time to Complete**: 30-60 minutes

**Questions?** Check [INDEX.md](INDEX.md) for documentation navigation.
