import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse } from '../models/user.model';
import { StorageService } from './storage.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  public readonly isAuthenticated = signal(false);
  public readonly currentUser = signal<User | null>(null);
  private readonly authToken$ = new BehaviorSubject<string | null>(null);

  public constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.storageService.getItem('authToken');
    if (token) {
      this.authToken$.next(token);
      this.isAuthenticated.set(true);
    }
  }

  public login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.storageService.setItem('authToken', response.token);
        this.storageService.setItem('user', JSON.stringify(response.user));
        this.authToken$.next(response.token);
        this.currentUser.set(response.user);
        this.isAuthenticated.set(true);
      })
    );
  }

  public logout(): void {
    this.storageService.removeItem('authToken');
    this.storageService.removeItem('user');
    this.authToken$.next(null);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  public getToken(): string | null {
    return this.authToken$.value;
  }

  public hasRole(role: string): boolean {
    return this.currentUser()?.roles.includes(role) ?? false;
  }
}
