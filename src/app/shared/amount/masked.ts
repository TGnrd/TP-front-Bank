import { CurrencyPipe } from "@angular/common";
import { Component, inject, input } from '@angular/core';
import { AccountStore } from '../../core/account-store';

@Component({
  selector: 'app-amount',
  imports: [CurrencyPipe],
  template: `
    @if (store.balancesHidden()) {
      <span class="amount">•••• €</span>
    } @else {
      <span class="amount" [class.negative]="value() < 0">{{ value() | currency: 'EUR' }}</span>
    }`,
  styles: `
    .negative {
      color: var(--color-danger);
    }`,
})
export class Amount {
  value = input.required<number>();
  protected readonly store = inject(AccountStore);
}