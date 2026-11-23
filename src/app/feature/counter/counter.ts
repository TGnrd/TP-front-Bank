import { BankApi } from "../../core/bank-api";
import { sortAccounts, totalBalance, holderName, formatIban, isOverdrawn } from "../../core/account-utils";
import { Component, inject, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { asProblem } from '../../core/problem';

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
  readonly holderName = holderName;
  readonly formatIban = formatIban;
  readonly isOverdrawn = isOverdrawn;

  readonly errorMessage = computed(() => {
    const error = this.accounts.error();
    if (!error) return null;

    const problem = asProblem(error);
    return problem?.detail ?? problem?.title
      ?? 'Le serveur de la banque ne répond pas.';
  });
}
