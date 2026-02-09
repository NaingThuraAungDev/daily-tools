import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <div class="welcome-section">
        <h1>Welcome, {{ currentUser()?.name }}!</h1>
        <p>This is your dashboard. Here you can manage your daily tools and tasks.</p>
      </div>

      <div class="dashboard-grid">
        <a routerLink="/converter/time" class="card card-link">
          <h2>Time Converter</h2>
          <p>Convert seconds to HH:mm:ss format</p>
        </a>

        <div class="card">
          <h2>Quick Stats</h2>
          <p>Your activity metrics appear here</p>
        </div>

        <div class="card">
          <h2>Recent Tasks</h2>
          <p>View your recent tasks and progress</p>
        </div>

        <div class="card">
          <h2>Settings</h2>
          <p>Manage your account and preferences</p>
        </div>
      </div>

      <button (click)="logout()" class="logout-btn">Logout</button>
    </div>
  `,
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);

  public currentUser = () => this.authService.currentUser();

  public logout(): void {
    this.authService.logout();
    // Navigation will be handled by route guards
  }
}
