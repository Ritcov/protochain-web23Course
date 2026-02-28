import request from 'supertest';
import { describe, expect, test, jest } from '@jest/globals';
import {app} from '../src/server/blockchainServer';
import Block from '../src/lib/block';

jest.mock('../src/lib/block');
jest.mock('../src/lib/blockchain')

describe('BlockchainServer Tests', () => {

    test('GET /status - Should return status', async () => {
        const response = await request(app)                
            .get('/status/');
        
        expect(response.status).toEqual(200);
        expect(response.body.isValid.success).toEqual(true);
    })

    test('GET /blocks/next', async () => {
        const response = await request(app)
            .get('/blocks/next');
        
        expect(response.status).toEqual(200);
        expect(response.body.index).toEqual(1);
    })

    test('GET /blocks/:index - Should get genesis', async () => {
        const response = await request(app)
            .get('/blocks/0');
        expect(response.status).toEqual(200);
        expect(response.body.index).toEqual(0);
    })

    test('GET /blocks/:hash', async () => {
        const response = await request(app)
            .get('/blocks/'+'mocked-genesis-hash');
        expect(response.status).toEqual(200);
        expect(response.body.data).toEqual('Genesis Block');
    })

    test('GET /blocks/:index - Should NOT get block', async () => {
        const response = await request(app)
            .get('/block/-1');
        expect(response.status).toEqual(404);
    })



    test('POST /blocks/ - Should add block', async () => {
        const block = new Block({
            index: 1,
            previousHash: "mocked-genesis-hash",
            data: "second mocked block in a mocked blockchain"
        } as Block);
        const response = await request(app)
            .post('/blocks/')
            .send(block);

        expect(response.status).toEqual(201);
        expect(response.body.index).toEqual(1);
    })

    test('POST /blocks/ - Should NOT add block (empty)', async () => {
        const response = await request(app)
            .post('/blocks/')
            .send({});

        expect(response.status).toEqual(422);
    })

    test('POST /blocks/ - Should NOT add block', async () => {
        const block = new Block({index: -1} as Block);
        const response = await request(app)
            .post('/blocks/')
            .send(block);

        expect(response.status).toEqual(400);

    })

})