import { Injectable, signal } from '@angular/core';

interface ConverterState {
    isLoading: boolean;
    error: string | null;
}

@Injectable({
    providedIn: 'root',
})
export class ConverterStore {
    public readonly state = signal<ConverterState>({
        isLoading: false,
        error: null,
    });

    public setLoading(isLoading: boolean): void {
        this.state.update((state) => ({ ...state, isLoading }));
    }

    public setError(error: string | null): void {
        this.state.update((state) => ({ ...state, error }));
    }
}
