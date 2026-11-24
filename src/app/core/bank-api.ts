import { Injectable } from '@angular/core';
import { httpResource, provideHttpClient } from '@angular/common/http';
import { AccountPage, OperationPage } from './models';

export const apiBaseUrl = "/api";

@Injectable({ providedIn: "root" })
export class BankApi {
    accounts() {
        return httpResource<AccountPage>(() => ({
            url: `${apiBaseUrl}/accounts`,
            params: { page: 1, pageSize: 100 },
        }));
    }
    lastOperations(accountId: () => number | null) {
        return httpResource<OperationPage>(() => {
            const id = accountId();
            return id === null
                ? undefined // aucun compte, aucune requête
                : `${apiBaseUrl}/accounts/${id}/operations?limit=20`;
        });
    }

}