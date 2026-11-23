export interface Customer {
 id: number;
 firstName: string;
 lastName: string;
 email: string;
 birthDate: string; // "1990-04-12" (DateOnly)
}
export interface CustomerRequest {
 firstName: string; // obligatoire, 100 caractères au plus
 lastName: string; // obligatoire, 100 caractères au plus
 email: string; // obligatoire, unique, 256 caractères au plus
 birthDate: string;
}
export interface CustomerPage {
 items: Customer[];
 page: number;
 pageSize: number;
 totalCount: number;
}
export interface Account {
 id: number;
 customerId: number;
 customerFirstName: string;
 customerLastName: string;
 iban: string; // sans espaces
 balance: number; // négatif possible
 overdraftLimit: number;
}
export interface AccountPage {
 items: Account[]; // tableau de comptes
 page: number;
 pageSize: number;
 totalCount: number;
}
export type OperationKind = 'Deposit' | 'Withdrawal' | 'TransferIn' |
'TransferOut';
export interface Operation {
 id: number;
 kind: OperationKind;
 amount: number; // toujours positif, le sens vient de kind
 balanceAfter: number;
 counterpartAccountId: number | null; // l'autre compte d'un virement
 createdAt: string; // ISO 8601, UTC
}
export interface OperationPage {
 items: Operation[]; // de la plus récente à la plus ancienne
 nextCursor: number | null; // à passer dans ?before= ; null s'il n'y a plus rien
}

export interface BankStats {
customerCount: number;
 accountCount: number;
 overdrawnAccountCount: number; // comptes à solde négatif
 totalBalance: number; // somme de tous les soldes
}
export type PayeeMatch = 'Match' | 'CloseMatch' | 'NoMatch';
export interface PayeeVerification {
 result: PayeeMatch;
 holderName?: string; // le nom du titulaire, pour CloseMatch seulement
}
export interface AmountRequest { amount: number; }
export interface TransferRequest {
 toAccountId?: number; // l'un OU l'autre, jamais les deux
 toIban?: string;
 amount: number;
}
export interface OverdraftRequest { limit: number; }
export interface CreateAccountRequest { iban: string; }
// Jour 4
export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest {
 email: string;
 password: string;
 firstName: string;
 lastName: string;
 birthDate: string;
}
export interface AccessTokenResponse {
 accessToken: string;
 expiresAt: string; // ISO 8601, 15 minutes après l'émission
}

export interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  errors?: Record<string, string[]>;
}