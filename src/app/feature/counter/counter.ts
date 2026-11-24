import { BankApi } from "../../core/bank-api";
import {sortAccounts, totalBalance, holderName, formatIban, isOverdrawn,availableBalance, AccountSort, matchesSearch
} from "../../core/account-utils";import { Component, inject, computed, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { asProblem } from '../../core/problem';
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-counter",
  imports: [CurrencyPipe, FormsModule, DatePipe],
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
  readonly masked = signal(false);

  readonly visible = computed(() => {
    const all = this.accounts.value()?.items ?? [];
    const found = all.filter((a) => matchesSearch(a, this.search()));
    return sortAccounts(found, this.sort());
  });
  readonly selectedId = signal<number | null>(null);
  readonly operations = this.api.lastOperations(this.selectedId);

   readonly availableBalance = availableBalance;

  readonly selectedAccount = computed(() => {
    const all = this.accounts.value()?.items ?? [];
    return all.find((a) => a.id === this.selectedId()) ?? null;
  });

  select(id: number): void {
    this.selectedId.update((current) => (current === id ? null : id));
  }

  closeDetail(): void {
    this.selectedId.set(null);
  }

   toggleMasked(): void {                  // ← la méthode ici
    this.masked.update((value) => !value);
  }

  readonly errorMessage = computed(() => {
    const error = this.accounts.error();
    if (!error) return null;

    const problem = asProblem(error);
    return problem?.detail ?? problem?.title
      ?? 'Le serveur de la banque ne répond pas.';
  });
}
