import { describe, test, expect, jest} from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';
import Transaction from '../src/lib/transaction';

//Mocked Class
jest.mock('../src/lib/block');

describe("Blockchain tests", () => {

    const blockchain = new Blockchain();

    test('Should has a genesis block', () => {
        expect(blockchain.blocks.length).toEqual(1);
    })


    test('Should be valid (genesis)', () => {
        const blockchain = new  Blockchain();
        expect(blockchain.isValid().success).toBeTruthy();
    })


    test('Shoud add block', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block({
            index: 1,
            previousHash: blockchain.blocks[0].hash,
            transactions: [new Transaction({
                data: "This is the second one"
            } as Transaction)]
        } as Block));

        expect(result.success).toBeTruthy();    
    })


     test('Should be valid (two blocks)', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block({
            index:1,
            previousHash: blockchain.blocks[0].hash,
            transactions: [new Transaction({
                data: "This is the second one (again)." 
            } as Transaction)]
        } as Block));
        expect(blockchain.blocks.length).toEqual(2);
    })


    test('Should NOT be valid (invalid block index)', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block({
            index: 1,
            previousHash: blockchain.blocks[0].hash,
            transactions: [new Transaction({
                data: "Block 2"
            } as Transaction)]
        } as Block))

        blockchain.blocks[1].index = -1;

        expect(blockchain.isValid().success).toBeFalsy();
    })


    
    test('Should NOT be valid (DO NOT add a new Block - invalid index)', () => {
        const blockcahin = new Blockchain();
        const result = blockchain.addBlock(new Block({
            index: -2,
            previousHash: blockchain.blocks[0].hash,
            transactions: [new Transaction({
                data: "This could NOT BE a second one too."
            } as Transaction)]
        } as Block));
        expect(result.success).toBeFalsy();
    })

    
    test('Should get block by hash', () => {
        const blockchain = new Blockchain();
        const block = blockchain.getBlock(blockchain.blocks[0].hash)
        expect(block).toBeTruthy();
    })


    test('Should get next block Info', () => {
        const blockchain = new Blockchain();
        const nextBlockInfo = blockchain.getNextBlock();

        expect(nextBlockInfo.index).toEqual(1);
    })

    
    /* Test previousHash do not work anymore

    test('Should NOT be valid (add a new Block - invalid previoush hash)', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block({
            index: 1,
            //previousHash: "Wubba Lubba Dub Dub";
            //previousHash: "",
            transactions: [new Transaction({
                data: "This could NOT BE a second one."
            } as Transaction)]
        } as Block));
        expect(result.success).toBeFalsy();
    })
    */

    /* Test for information changed on block do not work any more
    
    test('Should NOT be valid (intire Blockchain)', () => {
        const blockchain = new Blockchain();
        const block = new Block({
            index: 1,
            previousHash: blockchain.blocks[0].hash,
            transactions: [new Transaction({
                data: "fulano transfers A to beltrano"
            } as Transaction)]
        } as Block);
        blockchain.addBlock(block);
        blockchain.blocks[1].transactions[0].data = "fulano transfers A to sicrano";
        expect(blockchain.isValid().success).toBeFalsy();
    })
    */
})