import { Injectable, signal } from '@angular/core';

interface AuthState {
    isLoading: boolean;
    error: string | null;
    attemptCount: number;
}

@Injectable({
    providedIn: 'root',
})
export class AuthStore {
    public readonly state = signal<AuthState>({
        isLoading: false,
        error: null,
        attemptCount: 0,
    });

    public setLoading(isLoading: boolean): void {
        this.state.update((state) => ({ ...state, isLoading }));
    }

    public setError(error: string | null): void {
        this.state.update((state) => ({ ...state, error }));
    }

    public incrementAttempt(): void {
        this.state.update((state) => ({
            ...state,
            attemptCount: state.attemptCount + 1,
        }));
    }

    public resetAttempts(): void {
        this.state.update((state) => ({ ...state, attemptCount: 0 }));
    }
}
