import { Injectable } from "@angular/core";
import { signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AccountStore {
 private readonly _balancesHidden = signal(false);
 readonly balancesHidden = this._balancesHidden.asReadonly();
 toggleBalances() {
 this._balancesHidden.update((value) => !value);
 }
}
