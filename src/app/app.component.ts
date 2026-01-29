import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Daily Tools</h1>
      </header>
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public title = signal('Daily Tools');
}
