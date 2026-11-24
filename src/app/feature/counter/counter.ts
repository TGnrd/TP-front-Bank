import { BankApi } from "../../core/bank-api";
import { sortAccounts, totalBalance, holderName, formatIban, isOverdrawn, AccountSort, matchesSearch } from "../../core/account-utils";
import { Component, inject, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { asProblem } from '../../core/problem';
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-counter",
  imports: [CurrencyPipe, FormsModule],
  templateUrl: "./counter.html",
  styleUrl: "./counter.css",
})

export class Counter {
  private readonly api = inject(BankApi);
  readonly accounts = this.api.accounts();
  readonly holderName = holderName;
  readonly formatIban = formatIban;
  readonly isOverdrawn = isOverdrawn;
  readonly total = computed(() => totalBalance(this.visible()));
  readonly search = signal('');
  readonly sort = signal<AccountSort>('name');

  readonly visible = computed(() => {
    const all = this.accounts.value()?.items ?? [];
    const found = all.filter((a) => matchesSearch(a, this.search()));
    return sortAccounts(found, this.sort());
  });

  readonly errorMessage = computed(() => {
    const error = this.accounts.error();
    if (!error) return null;

    const problem = asProblem(error);
    return problem?.detail ?? problem?.title
      ?? 'Le serveur de la banque ne répond pas.';
  });
}
