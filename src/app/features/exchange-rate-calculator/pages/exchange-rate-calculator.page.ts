import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exchange-rate-calculator',
    imports: [CommonModule, FormsModule, DecimalPipe],
    template: `
    <div class="calculator-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Exchange Rate Calculator</h1>
      </div>

      <!-- Step 1: Market Price Section -->
      <div class="market-price-section">
        <h2>Step 1: Set Market Price</h2>
        <div class="market-price-inputs">
          <div class="input-group">
            <label for="thb-market">1 THB</label>
            <input
              id="thb-market"
              type="number"
              [value]="thbMarketPrice()"
              (input)="onThbMarketPriceChange($event)"
              step="0.0001"
              min="0"
            />
          </div>
          <span class="equals-sign">=</span>
          <div class="input-group">
            <label for="mmk-market">MMK</label>
            <input
              id="mmk-market"
              type="number"
              [value]="mmkMarketPrice()"
              (input)="onMmkMarketPriceChange($event)"
              step="0.0001"
              min="0"
            />
          </div>
        </div>
        <p class="rate-display">
          Rate: 1 MMK = {{ exchangeRateMMKtoTHB() | number:'1.6-6' }} THB
        </p>
      </div>

      <!-- Step 2: Conversion Section -->
      <div class="conversion-section">
        <h2>Step 2: Convert Currency</h2>
        
        <div class="conversion-inputs">
          <div class="input-wrapper">
            <label for="mmk-amount">Myanmar Kyat (MMK)</label>
            <div class="input-with-flag">
              <span class="flag">🇲🇲</span>
              <input
                id="mmk-amount"
                type="number"
                [value]="mmkAmount()"
                (input)="onMmkAmountChange($event)"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              <span class="currency-code">MMK</span>
            </div>
          </div>

          <button class="swap-btn" (click)="swapCurrencies()" title="Swap currencies">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 16V4M7 4L3 8M7 4l4 4"/>
              <path d="M17 8v12m0 0l4-4m-4 4l-4-4"/>
            </svg>
          </button>

          <div class="input-wrapper">
            <label for="thb-amount">Thai Baht (THB)</label>
            <div class="input-with-flag">
              <span class="flag">🇹🇭</span>
              <input
                id="thb-amount"
                type="number"
                [value]="thbAmount()"
                (input)="onThbAmountChange($event)"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              <span class="currency-code">THB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styleUrls: ['./exchange-rate-calculator.page.scss'],
})
export class ExchangeRateCalculatorComponent {
    private router = inject(Router);

    // Market price signals (default: 1 THB = 48 MMK)
    thbMarketPrice = signal(1);
    mmkMarketPrice = signal(48);

    // Conversion amount signals
    mmkAmount = signal(0);
    thbAmount = signal(0);

    // Computed exchange rate (MMK to THB)
    exchangeRateMMKtoTHB = computed(() => {
        const mmk = this.mmkMarketPrice();
        const thb = this.thbMarketPrice();
        return mmk > 0 ? thb / mmk : 0;
    });

    // Computed exchange rate (THB to MMK)
    exchangeRateTHBtoMMK = computed(() => {
        const mmk = this.mmkMarketPrice();
        const thb = this.thbMarketPrice();
        return thb > 0 ? mmk / thb : 0;
    });

    onThbMarketPriceChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = parseFloat(input.value) || 0;
        this.thbMarketPrice.set(value);
        this.updateThbAmount();
    }

    onMmkMarketPriceChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = parseFloat(input.value) || 0;
        this.mmkMarketPrice.set(value);
        this.updateMmkAmount();
    }

    onMmkAmountChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = parseFloat(input.value) || 0;
        this.mmkAmount.set(value);
        this.updateThbAmount();
    }

    onThbAmountChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = parseFloat(input.value) || 0;
        this.thbAmount.set(value);
        this.updateMmkAmount();
    }

    private updateThbAmount(): void {
        const mmk = this.mmkAmount();
        const rate = this.exchangeRateMMKtoTHB();
        this.thbAmount.set(mmk * rate);
    }

    private updateMmkAmount(): void {
        const thb = this.thbAmount();
        const rate = this.exchangeRateTHBtoMMK();
        this.mmkAmount.set(thb * rate);
    }

    swapCurrencies(): void {
        // Swap market prices
        const tempMarketPrice = this.thbMarketPrice();
        this.thbMarketPrice.set(this.mmkMarketPrice());
        this.mmkMarketPrice.set(tempMarketPrice);

        // Swap amounts
        const tempAmount = this.mmkAmount();
        this.mmkAmount.set(this.thbAmount());
        this.thbAmount.set(tempAmount);
    }

    goBack(): void {
        this.router.navigate(['/dashboard']);
    }
}
