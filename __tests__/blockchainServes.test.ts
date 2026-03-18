import request from 'supertest';
import { describe, expect, test, jest } from '@jest/globals';
import {app} from '../src/server/blockchainServer';
import Block from '../src/lib/block';
import Transaction from '../src/lib/transaction';

jest.mock('../src/lib/block');
jest.mock('../src/lib/blockchain')

describe('BlockchainServer Tests', () => {


//########################################### GET #############################################//    

    //  ################ BLOCKCHAIN #################   //    

    test('GET /status - Should return status', async () => {
        const response = await request(app)                
            .get('/status/');
        
        expect(response.status).toEqual(200);
        expect(response.body.isValid.success).toEqual(true);
    })

    //  ################### BLOCK ###################   //

    test('GET /blocks/next', async () => {
        const response = await request(app)
            .get('/blocks/next');
        
        expect(response.status).toEqual(200);
        expect(response.body.index).toEqual(1);
    })

    test('GET /blocks/:index - Should get a Genesis Block by Index', async () => {
        const response = await request(app)
            .get('/blocks/0');

        expect(response.status).toEqual(200);
        expect(response.body.index).toEqual(0);
    })

    test('GET /blocks/:hash - Should get a Genesis Block by Hash', async () => {
        const response = await request(app)
            .get('/blocks/'+'genesis-mocked-hash');

        expect(response.status).toEqual(200);
        expect(response.body.index).toEqual(0);
    })

    test('GET /blocks/:index - Should NOT get any Block', async () => {
        const response = await request(app)
            .get('/block/-1');

        expect(response.status).toEqual(404);
    })

    //  ################ TRANSACTIONS ################   //

    test('GET /transactions/ - Should be valid (Total mocked Transaction in mempool: 0)', async () => {
        const response = await request(app)
            .get('/transactions/');

        expect(response.body.total).toEqual(0);
    })

    test('GET /transactions/hash - Should be valid (Genesis mocked transaction)', async () => {
        const response = await request(app)
            .get('/transactions/' + 'genesis-mocked-transaction-hash');

        expect(response.status).toEqual(200);
        expect(response.body.blockIndex).toEqual(0);
        expect(response.body.transaction.data).toEqual("Genesis mocked block");
    })

    test('GET /transactions/hash - Should NOT find something (Noexsitent transaction)', async () => {
        const response = await request(app)
            .get('/transactions/' + 'wubba lubba dub dub');

        expect(response.body.mempoolIndex).toEqual(-1);
        expect(response.body.blockIndex).toEqual(-1);
    })

//########################################### POST #############################################//    


    //  ################### BLOCK ###################   //

    test('POST /blocks/ - Should add Block', async () => {
        const block = new Block({
            index: 1,
            previousHash: "mocked-genesis-hash",
            transactions: [new Transaction({
                data: "second mocked block in a mocked blockchain"
            } as Transaction)]
        } as Block);
        const response = await request(app)
            .post('/blocks/')
            .send(block);

        expect(response.status).toEqual(201);
        expect(response.body.index).toEqual(1);
    })

    test('POST /blocks/ - Should NOT add Block (invalid Block)', async () => {
        const response = await request(app)
            .post('/blocks/')
            .send({});

        expect(response.status).toEqual(422);
    })

    test('POST /blocks/ - Should NOT add Block (invalid index)', async () => {
        const block = new Block({index: -1} as Block);
        const response = await request(app)
            .post('/blocks/')
            .send(block);

        expect(response.status).toEqual(400);

    })

    //  ################### TRANSACTIONS ###################   //

    test('POST /transactions/ - Should be valid', async () => {
        const tx = new Transaction({
            data: "valid mocked transaction"
        } as Transaction);
        const response = await request(app)
            .post('/transactions/')
            .send(tx);
        
        expect(response.status).toEqual(201);
    })
    
    test('POST /transactions/ - Should NOT be valid (invalid transaction)', async () => {
        const tx = new Transaction();
        const response = await request(app)
            .post('/transactions/')
            .send(tx);

        expect(response.status).toEqual(400);
    })
})