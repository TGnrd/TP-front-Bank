import { Pipe, PipeTransform } from "@angular/core";
import { formatIban } from "../core/account-utils";


@Pipe({ name: "iban" })
export class IbanPipe implements PipeTransform {
 transform(value: string): string {
 return formatIban(value); // fonction pure du jour 1
 }
}

