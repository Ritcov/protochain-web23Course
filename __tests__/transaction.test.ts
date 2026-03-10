import { describe, test, expect } from '@jest/globals';
import Transaction from '../src/lib/transaction';
import TransactionType from '../src/lib/transactionType';

describe("Transaction tests", () => {

    test('Should be valid (REGULAR)', () => {
        const tx = new Transaction({
            data: "This is a goodamn transaction"
        } as Transaction)
        
        const valid = tx.isValid();
        expect(valid.success).toBeTruthy();
    })

    test('Should be valid (FEE)', () => {
        const tx = new Transaction({
            data: "This should represents a coinbase transaction",
            type: TransactionType.FEE
        } as Transaction)

        const valid = tx.isValid();
        expect(valid.success).toBeTruthy();
    })

    test('Should NOT be valid (INVALID HASH)', () => {
        const tx = new Transaction({
            data: "This tx hash would not be valid.",
            type: TransactionType.REGULAR,
            timestamp: Date.now(),
            hash: "Wubba Lubba Dub Dub"
        } as Transaction)
        
        const valid = tx.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (EMPTY DATA)', () => {
        const tx = new Transaction();

        const valid = tx.isValid();
        expect(valid.success).toBeFalsy();
    })
})
     