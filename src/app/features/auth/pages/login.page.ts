import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AuthStore } from '../auth.store';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="Enter your email"
            />
            <span *ngIf="email?.invalid && email?.touched" class="error">
              Please enter a valid email
            </span>
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input
              id="password"
              type="password"
              formControlName="password"
              placeholder="Enter your password"
            />
            <span *ngIf="password?.invalid && password?.touched" class="error">
              Password is required
            </span>
          </div>

          <button type="submit" [disabled]="!loginForm.valid || isLoading()">
            {{ isLoading() ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div *ngIf="error()" class="error-message">
          {{ error() }}
        </div>
      </div>
    </div>
  `,
    styleUrls: ['./login.page.scss'],
})
export class LoginComponent {
    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly authStore = inject(AuthStore);
    private readonly router = inject(Router);

    public loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    public isLoading = () => this.authStore.state().isLoading;
    public error = () => this.authStore.state().error;

    public get email() {
        return this.loginForm.get('email');
    }

    public get password() {
        return this.loginForm.get('password');
    }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            this.authStore.setLoading(true);
            this.authStore.setError(null);

            const { email, password } = this.loginForm.value;

            this.authService.login({ email: email!, password: password! }).subscribe({
                next: () => {
                    this.authStore.setLoading(false);
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    this.authStore.setLoading(false);
                    this.authStore.setError(
                        error?.error?.message || 'Login failed. Please try again.'
                    );
                    this.authStore.incrementAttempt();
                },
            });
        }
    }
}
