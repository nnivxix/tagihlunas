import { useTransactionsStore } from "./../../src/stores/transactions";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { beforeEach, describe, expect, test, assert } from "vitest";

describe("Transactions Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Calculate Amount", () => {
    const transactionsStore = useTransactionsStore();
    const amount = transactionsStore.calculateAmount([
      { id: 0, trx_id: "asa", created_at: "", flow: "cash-out", wallet: "ovo", amount: 1000 },
      { id: 0, trx_id: "asa", created_at: "", flow: "cash-out", wallet: "ovo", amount: 2000 },
    ]);
    expect(amount).toBe(3000);
  });
  test("Delete transactions by trx_id", () => {
    const transactionsStore = useTransactionsStore();
    const { transactions } = storeToRefs(transactionsStore);

    transactions.value = [
      { id: 0, trx_id: "ada", created_at: "", flow: "cash-out", wallet: "ovo", amount: 1 },
      { id: 0, trx_id: "asa", created_at: "", flow: "cash-out", wallet: "ovo", amount: 2 },
    ];
    transactionsStore.deleteTransaction("ada");
    assert.equal(transactions.value.length, 1);
  });
  test("Delete transactions by user_id", () => {
    const transactionsStore = useTransactionsStore();
    const { transactions } = storeToRefs(transactionsStore);
    transactions.value = [
      {
        id: 0,
        trx_id: "asa",
        created_at: "",
        flow: "cash-out",
        wallet: "ovo",
        amount: 1,
        user_id: "user-1",
      },
      {
        id: 0,
        trx_id: "asa",
        created_at: "",
        flow: "cash-out",
        wallet: "ovo",
        amount: 1,
        user_id: "user-1",
      },
      {
        id: 0,
        trx_id: "asa",
        created_at: "",
        flow: "cash-out",
        wallet: "ovo",
        amount: 1,
        user_id: "user-1",
      },
      {
        id: 0,
        trx_id: "asa",
        created_at: "",
        flow: "cash-out",
        wallet: "ovo",
        amount: 2,
        user_id: "user-2",
      },
    ];
    transactionsStore.deleteTransactionsByUserId("user-1");
    assert.equal(transactions.value.length, 1);
  });
});
