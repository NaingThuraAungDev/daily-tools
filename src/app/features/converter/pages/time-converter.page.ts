import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-time-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="converter-page">
      <div class="header">
        <a routerLink="/dashboard" class="back-link">&larr; Back to Dashboard</a>
        <h1>Seconds to Time Converter</h1>
        <p>Convert seconds to HH:mm:ss format</p>
      </div>

      <div class="converter-card">
        <div class="input-group">
          <label for="seconds">Seconds</label>
          <input
            type="number"
            id="seconds"
            [(ngModel)]="secondsInput"
            placeholder="Enter seconds"
            min="0"
          />
        </div>

        <button class="convert-btn" (click)="convert()">Convert</button>

        <div class="input-group">
          <label for="result">Result (HH:mm:ss)</label>
          <input
            type="text"
            id="result"
            [value]="result()"
            readonly
            placeholder="Result will appear here"
          />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./time-converter.page.scss'],
})
export class TimeConverterComponent {
  public secondsInput: number | null = null;
  public result = signal<string>('');

  public convert(): void {
    if (this.secondsInput === null || this.secondsInput < 0) {
      this.result.set('Please enter a valid number');
      return;
    }

    const totalSeconds = Math.floor(this.secondsInput);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formatted = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');

    this.result.set(formatted);
  }
}
