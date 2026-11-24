import { BankApi } from "../../core/bank-api";
import { sortAccounts, totalBalance, holderName, availableBalance, AccountSort, matchesSearch} from "../../core/account-utils"; 
import { Component, inject, computed, signal } from '@angular/core';
import { asProblem } from '../../core/problem';
import { FormsModule } from "@angular/forms";
import { AccountCard } from '../accounts/account-card/account-card';
import { Amount } from "../../shared/amount/masked";
import { IbanPipe } from "../../shared/iban-pipe";
import { Card } from "../../shared/card/card";
import { OperationList } from "../accounts/operation-list/operation-list";

@Component({
  selector: "app-counter",
  imports: [FormsModule, AccountCard, OperationList, Amount, IbanPipe, Card],
  templateUrl: "./counter.html",
  styleUrl: "./counter.css",
})

export class Counter {
  private readonly api = inject(BankApi);
  readonly accounts = this.api.accounts();
  readonly holderName = holderName;
  readonly total = computed(() => totalBalance(this.visible()));
  readonly search = signal('');
  readonly sort = signal<AccountSort>('name');

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

  readonly errorMessage = computed(() => {
    const error = this.accounts.error();
    if (!error) return null;

    const problem = asProblem(error);
    return problem?.detail ?? problem?.title
      ?? 'Le serveur de la banque ne répond pas.';
  });
}
