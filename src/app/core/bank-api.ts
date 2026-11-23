import { Injectable } from '@angular/core';
import { httpResource, provideHttpClient } from '@angular/common/http';
import { AccountPage } from './models';

export const apiBaseUrl = "/api"; 

@Injectable({ providedIn: "root" })
export class BankApi {
 accounts() {
 return httpResource<AccountPage>(() => ({
 url: `${apiBaseUrl}/accounts`,
 params: { page: 1, pageSize: 100 },
 }));
 }
}