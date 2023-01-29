import { useTransactionsStore } from './../../src/store/transactions';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { beforeEach, describe, expect, test, assert } from 'vitest';

describe('Transactions Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('Calculate Amount', () => {
    const transactionsStore = useTransactionsStore();
    const amount = transactionsStore.calculateAmount([
      {id: 0,trx_id: 'asa', created_at: '', flow: 'cash-out', wallet: 'ovo', amount: 1},
      {id: 0,trx_id: 'asa', created_at: '', flow: 'cash-out', wallet: 'ovo', amount: 2}]);
    expect(amount).toBe(3);
  });
  test('Delete Transactions', () => {
    const transactionsStore = useTransactionsStore();
    const { transactions } = storeToRefs(transactionsStore);

    transactions.value = [
      {id: 0,trx_id: 'ada', created_at: '', flow: 'cash-out', wallet: 'ovo', amount: 1},
      {id: 0,trx_id: 'asa', created_at: '', flow: 'cash-out', wallet: 'ovo', amount: 2},
    ];
    transactionsStore.deleteTransaction('ada');
    assert.equal(transactions.value.length, 1);
  });
});