import { describe, test, expect, jest} from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';

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
            data: "This is the second one"
        } as Block));
        expect(result.success).toBeTruthy();
    })
    
    test('Shuld be valid (blockchain)', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block({
            index:1,
            previousHash: blockchain.blocks[0].hash,
            data: "This is the second one (again)." 
        } as Block));
        expect(blockchain.isValid().success).toBeTruthy();
    })

    test('Should NOT be valid (add a new Block - invalid previoush hash)', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block({
            index: 1,
            previousHash: "Wubba Labba Dub Dub",
            data: "This could NOT BE a second one."
        } as Block));
        expect(result.success).toBeFalsy();
    })

    test('Should NOT be valid (add a new Block - invalid index)', () => {
        const blockcahin = new Blockchain();
        const result = blockchain.addBlock(new Block({
            index: -2,
            previousHash: blockchain.blocks[0].hash,
            data: "This could NOT BE a second one too."
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

    test('Should NOT be valid (intire Blockchain)', () => {
        const blockchain = new Blockchain();
        const block = new Block({
            index: 1,
            previousHash: blockchain.blocks[0].hash,
            data: "fulano transfers A to beltrano"
        } as Block);
        blockchain.addBlock(block);
        blockchain.blocks[1].data = "fulano transfers A to sicrano";
        expect(blockchain.isValid().success).toBeFalsy();
    })
})