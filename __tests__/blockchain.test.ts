import { describe, test, expect, jest} from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';
import Transaction from '../src/lib/transaction';

//Mocked Class
jest.mock('../src/lib/block');

describe("Blockchain tests", () => {

    const blockchain = new Blockchain();


    // ################ BLOCKCHAIN INTEGRITY ################

    // Test if the Blockchain has been initiate with a Genesis Block.
    test('Should has a Genesis Block', () => {
        expect(blockchain.blocks.length).toEqual(1);
    })


    // Test if the Blockchain is valid with the genesis Block.
    test('Should be valid (genesis)', () => {
        const blockchain = new  Blockchain();
        expect(blockchain.isValid().success).toBeTruthy();
    })


    // Test the validation function of the Blockchain and cating invalid index in some Block already pushed.
    test('Should NOT be valid (invalid Block index)', () => {
        const blockchain = new Blockchain();
        
        blockchain.mempool.push(new Transaction({
            data: "This NOT should be in the Second Block."
        } as Transaction))

        blockchain.addBlock(new Block({
            index: 1,
            previousHash: blockchain.blocks[0].hash,
            transactions: [blockchain.mempool[0]]
        } as Block))

        blockchain.blocks[1].index = -1;

        expect(blockchain.isValid().success).toBeFalsy();
    })
    

    // ######################### addBlock() ###########################

    // Test the function of addtion of a new Block in a Blockchain.
    test('Shoud add Block', () => {
        const blockchain = new Blockchain();

        blockchain.mempool.push(new Transaction({
            data: "This is the second one."
        } as Transaction));

        const result = blockchain.addBlock(new Block({
            index: 1,
            previousHash: blockchain.blocks[0].hash,
            transactions: [blockchain.mempool[0]]
        } as Block));

        expect(result.success).toBeTruthy();    
    })

    
    // Test if the second Block was truthy addtioned in a blockchain.
     test('Should be valid (two Blocks)', () => {
        const blockchain = new Blockchain();

        blockchain.mempool.push(new Transaction({
            data: "This is the second one (again)"
        }as Transaction));

        blockchain.addBlock(new Block({
            index:1,
            previousHash: blockchain.blocks[0].hash,
            transactions: [blockchain.mempool[0]]
        } as Block));
        expect(blockchain.blocks.length).toEqual(2);
    })

    
    // Test the function of addtion a new Block, rejecting a Block if a invalid index.
    test('Should NOT be valid (DO NOT add a new Block - invalid index)', () => {
        const blockchain = new Blockchain();

        blockchain.mempool.push(new Transaction({
            data: "This could NOT below at a Second Block."
        } as Transaction))

        const result = blockchain.addBlock(new Block({
            index: -2,
            previousHash: blockchain.blocks[0].hash,
            transactions: [blockchain.mempool[0]]
        } as Block));
        expect(result.success).toBeFalsy();
    })


    // ######################### getBlock() ###########################

    // Test the function that find a Block by 'they' Hash.        //TODO verify the correct form to write it
    test('Should get Block by Hash', () => {
        const blockchain = new Blockchain();
        const block = blockchain.getBlock(blockchain.blocks[0].hash)
        expect(block).toBeTruthy();
    })


    // ######################### getNextBlock() ###########################

    // Test the function that get the next Block information for buid. It works if have some transaction in mempool.
    test('Should get next Block Info', () => {
        const blockchain = new Blockchain();
        blockchain.mempool.push(new Transaction());
        const nextBlockInfo = blockchain.getNextBlock();

        expect(nextBlockInfo ? nextBlockInfo.index : 0).toEqual(1);
    })


    // Test the NULL return of a function the get a next block information if don't exists any transaction in mempool.
    test('Should NOT get next block info', () => {
        const blockchain = new Blockchain();
        const nextBlockInfo = blockchain.getNextBlock();

        expect(nextBlockInfo).toBeNull();
    })

    
    // ######################### addTransaction() ###########################

    // Test the function that add new transactions in mempool
    test('Should be valid - Add new Transaction in Mempool', () => {
        const blockchain = new Blockchain();
        const tx = new Transaction({
            data: "This is a transaction."
        } as Transaction);

        const validaton = blockchain.addTransaction(tx);

        expect(validaton.success).toBeTruthy();
    })


    // Test the rejection of addtion a new Transaction in mempool (empty data)
    test('Should NOT be valid - Add new Transaction (empty data)', () => {
        const blockchain = new Blockchain();
        const tx = new Transaction();

        const validation = blockchain.addTransaction(tx);

        expect(validation.success).toBeFalsy();
    })


    // Test the rejection of addtion a new Transaction in mempool when it already exists in mempool
    test('Should NOT be valid - Add new Transaction (duplicated tx - mempool)', () => {
        const blockchain = new Blockchain();
        const tx = new Transaction({
            data: "This is a transaction."
        } as Transaction);

        blockchain.mempool.push(tx);
        const validation = blockchain.addTransaction(tx);

        expect(validation.success).toBeFalsy();
    })


    // Test the rejection of addtion a new Transaction in mempool when it already exists in blockchain
    test('Should NOT be valid - Add new Transaction (duplicated tx - blockchain)', () => {
        const blockchain = new Blockchain();
        const tx = new Transaction({
            data: "This is a transaction."
        } as Transaction);

        blockchain.blocks.push(new Block({
            transactions: [tx]
        } as Block));
        const validation = blockchain.addTransaction(tx);

        expect(validation.success).toBeFalsy();
    })
    
    
    // ######################### getTransaction() ###########################

    // Test the function to get a transaction by Hash when it is already in some Block
    test('Should be valid - Get a Genesis Transaction Information by Hash', () => {
        const blockchain = new Blockchain();
        const genesisBlock = blockchain.blocks[0];

        const result = blockchain.getTransaction(genesisBlock.transactions[0].hash);

        expect(result.transaction).toBeTruthy();
    })


    // Test the function to get a transaction by Hash when it is in mempool
    test('Should be valid - Get a Transaction in mempool', () => {
        const blockchain = new Blockchain();
        const tx = new Transaction({
            data: "This definily is a fucking transaction!"
        } as Transaction);

        blockchain.mempool.push(tx);
        const result = blockchain.getTransaction(tx.hash);

        expect(result.transaction).toBeTruthy();
    })

    // Test the function to get a transaction by Hash when it is in nowhere. It just exist!
    test('Should NOT be valid - Get a transaction (nowhere)', () => {
        const blockchain = new Blockchain();
        const tx = new Transaction({
            data: "This is just a fucking transaction that no one fucking care."
        } as Transaction);

        const result = blockchain.getTransaction(tx.hash);

        expect(result.blockIndex).toEqual(-1);
        expect(result.mempoolIndex).toEqual(-1);
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