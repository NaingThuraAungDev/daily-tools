import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class.button--primary]="variant === 'primary'"
      [class.button--secondary]="variant === 'secondary'"
      [class.button--disabled]="disabled"
      [disabled]="disabled"
      (click)="onClick()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  public variant: 'primary' | 'secondary' = 'primary';
  public disabled = false;

  public onClick(): void {
    // Button click handler
  }
}
