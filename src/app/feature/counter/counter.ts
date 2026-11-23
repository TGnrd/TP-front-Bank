import { BankApi } from "../../core/bank-api";
import { sortAccounts, totalBalance } from "../../core/account-utils";
import { Component, inject, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: "app-counter",
    imports: [CurrencyPipe],
    templateUrl: "./counter.html",
    styleUrl: "./counter.css",
})

export class Counter {
  private readonly api = inject(BankApi);
  readonly accounts = this.api.accounts();
  readonly visible = computed(() => this.accounts.value()?.items ?? []);

  readonly errorMessage = computed(() => {
    const error = this.accounts.error();
    return error instanceof Error
      ? error.message
      : error
        ? 'Impossible de charger les comptes.'
        : null;
  });
}

