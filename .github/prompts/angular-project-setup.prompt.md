---
agent: agent
---
You are a senior Angular architect.

Create a production-ready Angular 20 project scaffolding using modern Angular best practices.

Requirements:
- Angular 20
- Standalone components only (NO NgModules)
- Strict TypeScript mode enabled
- SCSS for styling
- Angular Signals as the primary state mechanism
- RxJS only for async streams (HTTP, events)
- Feature-based architecture
- Angular Router with lazy-loaded routes
- HttpClient with typed services
- Global HTTP interceptors (auth, error, loading)
- Environment configuration (development, production)
- Centralized error handling strategy
- Route guards (auth + role-based)
- Reusable shared UI components
- Core services (auth, api, storage, logger)
- ESLint + Prettier configuration
- Unit testing setup (Jasmine + Karma or Jest)
- use below folder structure 
  src/
 ├── app/
 │   ├── core/                     # App-wide singleton logic
 │   │   ├── interceptors/
 │   │   │   ├── auth.interceptor.ts
 │   │   │   ├── error.interceptor.ts
 │   │   │   └── loading.interceptor.ts
 │   │   ├── guards/
 │   │   │   └── auth.guard.ts
 │   │   ├── services/
 │   │   │   ├── api.service.ts
 │   │   │   ├── auth.service.ts
 │   │   │   └── storage.service.ts
 │   │   └── models/
 │   │       └── user.model.ts
 │   │
 │   ├── shared/                   # Reusable UI & helpers
 │   │   ├── components/
 │   │   │   └── button/
 │   │   │       ├── button.component.ts
 │   │   │       └── button.component.scss
 │   │   ├── directives/
 │   │   └── pipes/
 │   │
 │   ├── features/                 # Business features (lazy loaded)
 │   │   ├── auth/
 │   │   │   ├── pages/
 │   │   │   │   └── login.page.ts
 │   │   │   ├── auth.routes.ts
 │   │   │   └── auth.store.ts
 │   │   │
 │   │   └── dashboard/
 │   │       ├── pages/
 │   │       │   ├── dashboard.page.ts
 │   │       │   └── dashboard.page.scss
 │   │       ├── dashboard.routes.ts
 │   │       └── dashboard.store.ts
 │   │
 │   ├── app.routes.ts
 │   └── app.component.ts
 │
 ├── environments/
 │   ├── environment.ts
 │   └── environment.prod.ts
 │
 └── styles/
     └── _variables.scss


Output format:
1. Generated folder structure
2. Key files with example code
3. README.md documentation including:

## README.md Requirements:

### 1. Setup Instructions Section
- Prerequisites (Node.js version, npm/yarn)
- Step-by-step installation instructions
- How to start the development server
- How to access the application locally

### 2. Project Structure Section
- Complete folder structure visualization
- Brief description of each folder's purpose
- Explanation of feature-based architecture organization

### 3. Architectural Decisions Section
- Explain each architectural decision with:
  - **Decision**: What was chosen
  - **Benefit**: Why it was chosen
  - **Implementation**: How it's implemented in the project
- Cover all requirements:
  - Standalone components
  - Angular Signals for state management
  - RxJS usage strategy
  - Feature-based architecture
  - Lazy-loaded routes
  - Strict TypeScript mode
  - HTTP interceptors (Auth, Error, Loading)
  - Environment configuration
  - Centralized error handling
  - Route guards (Auth + Role-based)
  - SCSS styling approach
  - Shared components strategy

### 4. Running, Building, and Testing Section
- **Development Server**: `ng serve` command and instructions
- **Production Build**: `ng build --configuration production` command
- **Unit Testing**: 
  - Test execution command
  - Testing framework (Jasmine + Karma/Jest)
  - Test file organization (.spec.ts files)
  - Code coverage reporting
- **Linting & Code Quality**:
  - ESLint configuration
  - Prettier formatting
  - Auto-format instructions

### 5. Key Features Section
- Bulleted list of main features (with checkmarks)
- Technology stack overview

### 6. Contributing Section
- Guidelines for adding new features
- Folder structure adherence instructions

### 7. License Section
- License type (MIT or applicable)

### Additional Notes:
- If README.md already exists, UPDATE it with the above sections
- If README.md does not exist, CREATE a new comprehensive README.md
- Ensure all sections are properly formatted with markdown
- Use code blocks for commands and examples
- Use proper hierarchy with H2 (#) and H3 (##) headings