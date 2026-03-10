import { describe, test, expect, beforeAll, jest } from "@jest/globals";
import Block from "../src/lib/block";
import BlockInfo from "../src/lib/blockInfo";
import Transaction from "../src/lib/transaction";
import TransactionType from "../src/lib/transactionType";

//Mocked Class
jest.mock('../src/lib/transaction');

describe("Block tests", () => {

    const exampleDifficulty = 0;
    const exampleMiner = "ritvicov";

    let genesis: Block;

    beforeAll(() => {
        genesis = new Block({
            transactions: [new Transaction({
                data: "Genesis Block"
            } as Transaction)]
        } as Block);
    })

    test('Should be valid', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);
        block.mine(exampleDifficulty, exampleMiner);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeTruthy();
    })

    test('Should create a Block from BlockInfo', () => {
        const block = Block.fromBlockInfo({
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)],
            difficulty: exampleDifficulty,
            feePerTx: 1,
            index: 1,
            maxDifficulty: 63,
            previousHash: genesis.hash
        }as BlockInfo);
        block.mine(exampleDifficulty, exampleMiner);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeTruthy();        
    })

    test('Should NOT be valid (fallbacks)', () => {
        const block = new Block();
        block.mine(exampleDifficulty, exampleMiner);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (previous hash)', () => {
        const block = new Block({
            index: 1,
            previousHash: "abc",
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);
        block.mine(exampleDifficulty, exampleMiner);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (timestamp)', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);
        block.timestamp = -1;
        block.mine(exampleDifficulty, exampleMiner);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (empty hash)', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "Block 2"
            }as Transaction)]
        } as Block);
        block.mine(exampleDifficulty, exampleMiner);

        block.hash = "";

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (no mined)', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (empty data)', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [new Transaction()]
        } as Block);
        block.mine(exampleDifficulty, exampleMiner)

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (index)', () => {
        const block = new Block({
            index: -1,
            previousHash: genesis.hash,
            transactions: [new Transaction({
                data: "block 2"
            } as Transaction)]
        } as Block);
        block.mine(exampleDifficulty, exampleMiner);
        
        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (MANY FEES)', () => {
        const block = new Block({
            index: 1,
            previousHash: genesis.hash,
            transactions: [
                new Transaction({
                    type: TransactionType.FEE,
                    data: "This represents a coinbase transaction"
                } as Transaction),
                 new Transaction({
                    type: TransactionType.FEE,
                    data: "The SECOND coinbase transaction (invalid)"
                } as Transaction)
            ]
        } as Block);
        block.mine(exampleDifficulty, exampleMiner);

        const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
        expect(valid.success).toBeFalsy()
    })

})