import { Account, Operation } from "./models";

export function totalBalance(accounts: Account[]): number {
  return accounts.reduce((sum, account) => sum + account.balance, 0);
}

export type AccountSort = "name" | "balance";
export function sortAccounts(accounts: Account[], sort: AccountSort): Account[] {
  const copy = [...accounts]; // la liste reçue reste intacte
  if (sort === "balance") {
    return copy.sort((a, b) => b.balance - a.balance);
  }
  const key = (a: Account) => `${a.customerLastName} ${a.customerFirstName}`;
  return copy.sort((a, b) => key(a).localeCompare(key(b), "fr"));
}


export function availableBalance(account: Account): number {
  return account.balance + account.overdraftLimit;
}

export const isOverdrawn = (account: Account): boolean => account.balance < 0;

export function holderName(account: Account): string {
  return `${account.customerFirstName} ${account.customerLastName}`;
}

export function formatIban(iban: string): string {
  return iban
    .replace(/\s+/g, '')
    .toUpperCase()
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export function matchesSearch(account: Account, term: string): boolean {
 const search = term.trim().toLowerCase();
 if (search === "") {
 return true; // recherche vide, tout passe
 }
 const name = holderName(account).toLowerCase();
 const iban = account.iban.toLowerCase();
 return name.includes(search) || iban.includes(search.replace(/\s+/g, ""));
}