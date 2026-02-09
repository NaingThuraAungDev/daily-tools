import { Routes } from '@angular/router';
import { TimeConverterComponent } from './pages/time-converter.page';

export const CONVERTER_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'time',
        pathMatch: 'full',
    },
    {
        path: 'time',
        component: TimeConverterComponent,
    },
];
