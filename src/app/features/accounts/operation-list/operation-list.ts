import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { signedAmount } from '../../../core/account-utils';
import { Operation } from '../../../core/models';
import { Amount } from '../../../shared/amount/masked';

@Component({
  selector: 'app-operation-list',
  imports: [DatePipe, Amount],
  templateUrl: './operation-list.html',
  styleUrl: './operation-list.css',
})
export class OperationList {
  operations = input.required<Operation[]>();
  protected readonly signedAmount = signedAmount;
}