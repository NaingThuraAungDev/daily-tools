import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.page.html',
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
