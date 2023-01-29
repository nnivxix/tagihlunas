import { useTransactionsStore } from './../../src/store/transactions';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { beforeEach, describe, expect, test, assert } from 'vitest';

describe('Transactions Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('Calculate Amount', () => {
    const transactionsStore = useTransactionsStore();
    const amount = transactionsStore.calculateAmount([{amount: 1}, {amount: 2}]);
    expect(amount).toBe(3);
  });
  test('Delete Transactions', () => {
    const transactionsStore = useTransactionsStore();
    const { transactions } = storeToRefs(transactionsStore);

    transactions.value = [
      {
        trx_id: '1213',
        wallet: 'Ovo',
      },
      {
        trx_id: '1234',
        wallet: 'Gopay',
      },
    ];
    transactionsStore.deleteTransaction('1213');
    assert.equal(transactions.value.length, 1);
  });
});