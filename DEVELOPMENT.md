# Angular 20 Project Development Guide

This project is a production-ready Angular 20 application built with modern best practices.

## Key Development Concepts

### Signals vs Observables

**Use Signals for:**
- Local component state
- Synchronous value updates
- Simple state management

**Use Observables for:**
- HTTP requests
- Event streams
- Async operations with operators

### Component Structure

Every component should be:
- Standalone (`standalone: true`)
- Focused on a single responsibility
- Self-contained with its imports declared

### Service Patterns

Services in `core/services/` are singletons that provide:
- Authentication
- HTTP communication
- Data persistence
- Shared business logic

Feature services are specific to a feature module.

### State Management with Signals

```typescript
// Define state
public readonly state = signal<State>({
  isLoading: false,
  data: null,
  error: null,
});

// Update state
this.state.update(s => ({ ...s, isLoading: true }));

// Read state in component
public isLoading = () => this.service.state().isLoading;
```

### Reactive Forms

Always use Reactive Forms for:
- Complex form logic
- Dynamic controls
- Form validation
- Testing ease

```typescript
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
});
```

## Common Patterns

### HTTP Error Handling

```typescript
service.getData().subscribe({
  next: (data) => { /* handle success */ },
  error: (error) => { /* handle error */ },
  complete: () => { /* cleanup */ },
});
```

### Route Navigation

```typescript
this.router.navigate(['/dashboard']);
this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/dashboard' } });
```

### Dependency Injection

```typescript
constructor(
  private readonly httpClient: HttpClient,
  private readonly router: Router,
) {}

// In functional context
const httpClient = inject(HttpClient);
```

## Performance Tips

1. Use `OnPush` change detection in components
2. Unsubscribe from observables to prevent memory leaks
3. Use `trackBy` with `*ngFor` for better performance
4. Lazy load routes whenever possible
5. Use pipe for Observable operators

## Testing Guidelines

1. Use TestBed for component testing
2. Mock services in tests
3. Test user interactions, not implementation
4. Aim for >80% code coverage
5. Keep tests focused and readable

## File Naming Conventions

- Components: `component-name.component.ts`
- Services: `service-name.service.ts`
- Tests: `file-name.spec.ts`
- Routes: `feature-name.routes.ts`
- Store: `feature-name.store.ts`
- Models: `model-name.model.ts`

## Common Issues & Solutions

### Issue: Circular dependencies
**Solution**: Refactor services into separate concerns

### Issue: Memory leaks
**Solution**: Properly unsubscribe from observables or use `takeUntilDestroyed()`

### Issue: Slow tests
**Solution**: Mock external dependencies, use `fakeAsync` for async operations

### Issue: Type errors with strict mode
**Solution**: Use proper type annotations, handle nullability explicitly
