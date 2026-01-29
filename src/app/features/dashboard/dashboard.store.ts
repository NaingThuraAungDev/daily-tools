import { Injectable, signal } from '@angular/core';

interface DashboardState {
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardStore {
  public readonly state = signal<DashboardState>({
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
