import { describe, test, expect } from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';

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
        const result = blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, "This is the second one"));
        expect(result.success).toBeTruthy();
    })
    
    test('Shuld be valid (blockchain)', () => {
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, "This is the second one (again)."));
        expect(blockchain.isValid().success).toBeTruthy();
    })

    test('Should NOT be valid (add a new Block - invalid hash)', () => {
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block(1,"Wubba Labba Dub Dub","This could NOT BE a second one."));
        expect(result.success).toBeFalsy();
    })

    test('Should NOT be valid (add a new Block - invalid index)', () => {
        const blockcahin = new Blockchain();
        const result = blockchain.addBlock(new Block(2,blockchain.blocks[0].hash, "This could NOT BE a second one too."));
        expect(result.success).toBeFalsy();
    })

    test('Should get block', () => {
        const blockchain = new Blockchain();
        const block = blockchain.getBlock(blockchain.blocks[0].hash)
        expect(block).toBeTruthy();
    })

    test('Should NOT be valid (intire Blockchain)', () => {
        const blockchain = new Blockchain();
        const block = new Block(1, blockchain.blocks[0].hash, "fulano transfers A to beltrano");
        blockchain.addBlock(block);
        blockchain.blocks[1].data = "fulano transfers A to sicrano";
        expect(blockchain.isValid().success).toBeFalsy();
    })
})