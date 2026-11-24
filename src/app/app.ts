import { Component, inject } from '@angular/core';
import { Counter } from './features/counter/counter';
import { AccountStore } from './core/account-store';

@Component({
  selector: 'app-root',
  imports: [Counter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly store = inject(AccountStore);
}