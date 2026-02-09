import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    },
    {
        path: 'exchange-rate-calculator',
        loadChildren: () =>
            import('./features/exchange-rate-calculator/exchange-rate-calculator.routes').then(
                (m) => m.EXCHANGE_RATE_CALCULATOR_ROUTES
            ),
    },
    {
        path: 'converter',
        loadChildren: () =>
            import('./features/converter/converter.routes').then((m) => m.CONVERTER_ROUTES),
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];
