import { sortAccounts } from './account-utils';
import { Account } from './models';

function makeAccount(
  id: number,
  firstName: string,
  lastName: string,
  balance: number,
): Account {
  return {
    id,
    customerId: id,
    customerFirstName: firstName,
    customerLastName: lastName,
    iban: 'FR5530001007940000000001011',
    balance,
    overdraftLimit: 0,
  };
}

describe('sortAccounts', () => {
  const alice = makeAccount(1, 'Alice', 'Martin', 1000);
  const bob = makeAccount(2, 'Bob', 'Durand', -50);
  const zoe = makeAccount(3, 'Zoé', 'Martin', 550);

  it('trie par nom de famille puis prénom', () => {
    const result = sortAccounts([alice, zoe, bob], 'name');
    expect(result.map((a) => a.id)).toEqual([2, 1, 3]); // Durand, Martin Alice, Martin Zoé
  });

  it('trie par solde décroissant', () => {
    const result = sortAccounts([bob, alice, zoe], 'balance');
    expect(result.map((a) => a.id)).toEqual([1, 3, 2]);
  });

  it('ne modifie pas le tableau reçu', () => {
    const input = [alice, bob, zoe];
    const result = sortAccounts(input, 'balance');
    expect(result).not.toBe(input);
    expect(input).toEqual([alice, bob, zoe]);
  });
});