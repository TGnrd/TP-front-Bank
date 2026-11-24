import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Account } from '../../../core/models';
import { holderName, isOverdrawn } from '../../../core/account-utils';
import { Amount } from '../../../shared/amount/masked';
import { IbanPipe } from '../../../shared/iban-pipe'

@Component({
 selector: "app-account-card",
 imports: [CurrencyPipe, Amount, IbanPipe],
 templateUrl: "./account-card.html",
 styleUrl: "./account-card.css",
})
export class AccountCard {
  account = input.required<Account>();
  selected = input(false);          // pour la classe .selected
  choose = output<number>();        // émet l'id du compte

  protected readonly holder = computed(() => holderName(this.account()));
  protected readonly overdrawn = computed(() => isOverdrawn(this.account()));
}
