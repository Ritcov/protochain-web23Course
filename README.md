# Protochain - Web3 Course Project

> An educational implementation of blockchain (protochain) developed as part of the Web3 course taught by **Prof. Luiz Tools**.

## 📚 About the Project

**Protochain** is a simplified implementation of a blockchain, created for educational purposes to teach the fundamental concepts of:

- **Blocks**: Basic structure that stores data and cryptographic hash
- **Blockchain**: Chain of connected blocks with integrity validation
- **Cryptography**: Using SHA256 to ensure security
- **Validation**: System for verifying blocks before adding them to the chain
- **Wallets**: Implementation of digital wallets
- **Cryptographic Keys**: Generation and management of keys

This project serves as an educational foundation for understanding how blockchains work before studying more complex implementations like Bitcoin or Ethereum.

---

## 🏗️ Project Structure

```
protochain-web23Course/
├── src/
│   ├── lib/                      # Core blockchain logic
│   │   ├── __mocks__/            # Mock classes for Jest testing (Aula 06)
│   │   │   ├── block.ts          # Mocked Block Class
│   │   │   ├── transactions.ts   # Mocked Transactions Class (Aula 13)
│   │   │   └── blockchain.ts     # Mocked Blockchain Class
│   │   ├── block.ts              # Block Class - Represents a single block
│   │   ├── blockchain.ts         # Blockchain Class - Manages the chain
│   │   ├── blockInfo.ts          # BlockInfo Interface - Mining parameters (Aula 09+)
│   │   ├── transaction.ts        # Transaction Class - Represents a transaction (Aula 11+)
│   │   ├── transactionType.ts    # TransactionType Enum - Transaction types (Aula 11+)
│   │   ├── transactionSearch.ts  # TransactionSearch Interface - Search result for transactions (Aula 14+)
│   │   ├── wallet.ts             # Wallet Class - Manages digital wallets
│   │   ├── validation.ts         # Validation Class - Validation system
│   │   └── keyWord.ts            # KeyWord Class - Key generation
│   ├── server/                   # Express API Server (Aula 04+)
│   │   └── blockchainServer.ts   # Local server for blockchain API requests
│   └── client/                   # Miner Client (Aula 09+)
│       └── minerClient.ts        # Miner client - Connects to server and mines blocks (Aula 10)
├── __tests__/                    # Unit & Integration tests with Jest + Supertest (Aula 06-07)
│   ├── block.test.ts             # Block class unit tests
│   ├── blockchain.test.ts        # Blockchain class unit tests
│   ├── transactions.test.ts      # Transactions class unit tests
│   └── blockchainServes.test.ts  # Supertest integration tests (Aula 07)
├── dist/                         # Compiled code (JavaScript)
├── coverage/                     # Test coverage report
├── .env                          # Environment variables (local - not in git)
├── .env.example                  # Environment variables template
├── tsconfig.json                 # TypeScript configuration
├── jest.config.ts                # Jest configuration
├── package.json                  # Project dependencies
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14+
- **npm** or **yarn**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ritcov/protochain-web23Course.git
cd protochain-web23Course
```

2. Install dependencies:
```bash
npm install
```

---

## 📖 Usage

### Compile TypeScript to JavaScript

```bash
npm run compile
```

Compiles `.ts` files from the `src/` folder to `.js` in `dist/`.

### Run in Development Mode

```bash
npm run dev
```

Executes `src/blockchain.ts` with native TypeScript support via `ts-node`.

### Run the Blockchain Server (Aula 04+)

```bash
npm run blockchain
```

Starts a local Express server that accepts API requests to interact with the blockchain. The server runs on a configurable port and provides endpoints for blockchain operations.

### Run in Production

```bash
npm start
```

Executes the compiled code in `dist/blockchain.js`.

### Run Tests

```bash
npm test
```

Runs all tests with Jest and generates a coverage report.

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **TypeScript** | ^4.8.4 | Statically typed language |
| **Express** | ^4.18.2 | Web server framework (Aula 04+) |
| **crypto-js** | ^4.2.0 | Cryptographic functions (SHA256) |
| **Morgan** | ^1.10.1 | HTTP request logging middleware |
| **Jest** | ^30.2.0 | Testing framework |
| **ts-jest** | ^29.4.6 | Jest + TypeScript integration |
| **ts-node** | ^10.9.2 | Direct TypeScript execution |
| **Supertest** | ^6.x | HTTP assertion library for testing Express (Aula 07+) |

---

## 📝 Main Classes

### Block
Represents a single block in the blockchain.

```typescript
const block = new Block(
  0,                          // index
  "previous_hash",           // previousHash
  "block data"               // data
);

block.isValid("previous_hash", 0); // Validates the block
```

**Properties:**
- `index`: Position of the block in the chain
- `timestamp`: Creation date/time
- `hash`: SHA256 hash of the block
- `previousHash`: Hash of the previous block
- `data`: Data stored in the block

---

### Blockchain
Manages the complete chain of blocks.

```typescript
const blockchain = new Blockchain();

// Add new block
const newBlock = new Block(1, blockchain.getLastBlock().hash, "new data");
const validation = blockchain.addBlock(newBlock);

if (validation.isValid) {
  console.log("Block added successfully!");
}
```

**Main methods:**
- `addBlock(block)`: Adds a new validated block
- `getLastBlock()`: Returns the last block in the chain
- `isValid()`: Validates the entire blockchain

---

### Wallet
Implements a simplified digital wallet.

```typescript
const wallet = new Wallet();
```

---

### Validation
Integrity validation system.

```typescript
const validation = new Validation();
validation.isValid; // true/false
```

---

### KeyWord
Cryptographic key generation and management.

```typescript
const keyWord = new KeyWord();
```

---

## 🌐 Blockchain Server (Aula 04+)

Express-based REST API for blockchain interactions.

```bash
npm run blockchain  # Starts server on port 3000
```

**Available Endpoints:**
- `GET /blocks` - Get all blocks
- `GET /blocks/:indexOrHash` - Get specific block
- `POST /blocks` - Create and add new block (Aula 05+)

---

## 🆕 Aula 05 - AddBlock, Fallbacks & Casting

### What's New

**Block Constructor Enhancement:**
- Refactored to accept optional Block objects with fallback values
- Type-safe with proper TypeScript interfaces
- More flexible instantiation pattern

**New POST /blocks Endpoint:**
- Add blocks to blockchain via HTTP request
- Validates block data automatically
- Returns appropriate HTTP status codes (201, 400, 422)

### Example - POST /blocks

**Request:**
```bash
curl -X POST http://localhost:3000/blocks \
  -H "Content-Type: application/json" \
  -d '{
    "index": 1,
    "timestamp": 1708812000000,
    "hash": "...",
    "previousHash": "genesis_hash...",
    "data": "Transaction data"
  }'
```

**Success Response (201):**
```json
{
  "index": 1,
  "timestamp": 1708812000000,
  "hash": "...",
  "previousHash": "...",
  "data": "Transaction data"
}
```

**Error Responses:**
- `422` - Missing required fields
- `400` - Block validation failed (invalid hash, index, etc.)

### Key Improvements
- ✅ Type casting support for request bodies
- ✅ Fallback values in constructors using optional chaining
- ✅ Enhanced validation error messages
- ✅ Comprehensive JSDoc documentation

---

## 🆕 Aula 06 - Mocking Classes

### What's New

**Jest Mock Classes for Unit Testing:**
- Created `__mocks__/` directory in `src/lib/` for isolated testing
- Mocked Block and Blockchain classes with simplified implementations
- Prepared infrastructure for integration testing in Aula 07

### Why Mocking?

Mocking allows you to:
- Test components in **isolation** without external dependencies
- **Speed up tests** by avoiding expensive operations
- **Control behavior** of dependencies (Block, Blockchain)
- **Simplify assertions** with predictable mock data

### Mock Classes Created

**Block Mock (`src/lib/__mocks__/block.ts`):**
```typescript
// Mocked properties with fallback values
- index: 0 (fallback)
- timestamp: Date.now() (fallback)
- hash: "mocked-hash" (fallback)
- previousHash: "" (fallback)
- data: "" (fallback)

// Simplified methods
- getHash(): Returns mocked hash
- isValid(): Basic validation for mock testing
```

**Blockchain Mock (`src/lib/__mocks__/blockchain.ts`):**
```typescript
// Initialized with genesis block
- blocks: [Block with "Genesis Block" data]
- nextIndex: 1 (incremented on addBlock)

// Simplified methods
- addBlock(): Adds block to array (simplified validation)
- getLastBlock(): Returns last block
- getBlock(hash): Find block by hash
- isValid(): Always returns valid for mocking
```

### Key Features
- ✅ Mocked Block class with fallback values in constructor
- ✅ Mocked Blockchain with automatic genesis block initialization
- ✅ Simplified validation logic (focus on structure, not logic)
- ✅ Prepared for integration testing in Aula 07

---

## 🆕 Aula 07 - Supertest & Integration Tests

### What's New

**Integration Testing Framework:**
- Implemented **Supertest** for testing Express routes
- Created `blockchainServes.test.ts` for full endpoint coverage
- Testing HTTP requests/responses with mocked dependencies

### Integration Testing with Supertest

Supertest allows you to:
- **Make HTTP requests** to your Express app without a server
- **Assert responses** (status codes, body content)
- **Test integration** between routes, controllers, and services

### Test Coverage

**File: `__tests__/blockchainServes.test.ts`**

#### 1. GET /status - Health Check
```bash
curl http://localhost:3000/status/
```
- ✅ Returns `200` status code
- ✅ Response contains `isValid.success: true`

#### 2. GET /blocks/:index - Retrieve by Index
```bash
curl http://localhost:3000/blocks/0
```
- ✅ Returns `200` with genesis block (index: 0)
- ✅ Successfully retrieves block by index

#### 3. GET /blocks/:hash - Retrieve by Hash
```bash
curl http://localhost:3000/blocks/mocked-genesis-hash
```
- ✅ Returns `200` with genesis block data
- ✅ Successfully retrieves block by hash

#### 4. POST /blocks - Add New Block
```bash
curl -X POST http://localhost:3000/blocks/ \
  -H "Content-Type: application/json" \
  -d '{
    "index": 1,
    "previousHash": "mocked-genesis-hash",
    "data": "second mocked block in a mocked blockchain"
  }'
```
- ✅ Returns `201` (Created) on success
- ✅ Response contains newly added block

#### 5. Error Handling

**Invalid Request (Empty Body):**
```bash
curl -X POST http://localhost:3000/blocks/ \
  -H "Content-Type: application/json" \
  -d '{}'
```
- ✅ Returns `422` (Unprocessable Entity) - missing required fields

**Invalid Block Data:**
```bash
curl -X POST http://localhost:3000/blocks/ \
  -H "Content-Type: application/json" \
  -d '{
    "index": -1,
    "previousHash": "mocked-genesis-hash",
    "data": "invalid block"
  }'
```
- ✅ Returns `400` (Bad Request) - validation failed

### Jest Mocking Integration

```typescript
// Automatically mock Block and Blockchain classes
jest.mock('../src/lib/block');
jest.mock('../src/lib/blockchain')

// Tests use mocked versions from __mocks__/
const block = new Block({ ... });  // Uses mock
```

### Key Features
- ✅ Full endpoint coverage (GET /status, GET /blocks/:id, POST /blocks/)
- ✅ HTTP status code validation (200, 201, 400, 404, 422)
- ✅ Request/Response assertion examples
- ✅ Error handling and edge case testing
- ✅ Mock integration with jest.mock()

---

## 🆕 Aula 08 - ProtoMiner (Proof of Work)

### What's New

Introduction of **ProtoMiner**, implementing a basic **Proof of Work (PoW)** mechanism.

Blocks must now be **mined** before being considered valid.

---

## ⛏️ Block Updates

### New Mining Fields

- `nonce`
- `miner`

### Updated Constructor

```ts
constructor(block?: Block) {
    this.index = block?.index || 0;
    this.timestamp = block?.timestamp || Date.now();
    this.previousHash = block?.previousHash || "";
    this.data = block?.data || "";
    this.nonce = block?.nonce || 0;
    this.miner = block?.miner || "";
    this.hash = block?.hash || this.getHash();
}
```

### Updated Hash Function

```ts
getHash(): string {
    return sha256(
        this.index +
        this.data +
        this.timestamp +
        this.previousHash +
        this.nonce +
        this.miner
    ).toString();
}
```

### Mining Method

```ts
mine(difficulty: number, miner: string) {
    this.miner = miner;
    const prefix = new Array(difficulty + 1).join("0");

    do {
        this.nonce++;
        this.hash = this.getHash();
    } while (!this.hash.startsWith(prefix));
}
```

### Validation Update

```ts
isValid(previousHash: string, previousIndex: number, difficulty: number): Validation {
    const prefix = new Array(difficulty + 1).join("0");

    if (this.hash !== this.getHash() || !this.hash.startsWith(prefix)) {
        return new Validation(false, "Invalid hash (modified information)");
    }
}
```

---

## ⛓️ Blockchain Updates

### Dynamic Difficulty

```ts
static readonly DIFFICULTY_FACTOR = 5;

getDifficulty(): number {
    return Math.ceil(this.blocks.length / Blockchain.DIFFICULTY_FACTOR);
}
```

---

## 🧪 Tests Updates

### Mining before validation

```ts
block.mine(exampleDifficulty, exampleMiner);
```

### New test (non-mined block should be invalid)

```ts
test('Should NOT be valid (not mined)', () => {
    const block = new Block({
        index: 1,
        previousHash: genesis.hash,
        data: "block 2"
    } as Block);

    const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty);
    expect(valid.success).toBeFalsy();
});
```

---

## 🆕 Aula 09 - Block Info & Miner Client

### What's New

Introduction of **BlockInfo interface** and **next block generation endpoint**, enabling miners to retrieve mining parameters from the blockchain.

Also includes an initial **miner client prototype**.

---

## 📦 BlockInfo Interface

New interface to provide mining data:

```ts
export default interface BlockInfo {
    index: number;
    previousHash: string;
    difficulty: number;
    maxDifficulty: number;
    feePerTx: number;
    data: string;
}
```

---

## ⛓️ Blockchain Updates

### New Constants

```ts
static readonly MAX_DIFFICULTY = 62;
```

### New Methods

```ts
getFeePerTx(): number {
    return 1;
}

getNextBlock(): BlockInfo {
    const data = new Date().toString();
    const difficulty = this.getDifficulty();
    const previousHash = this.getLastBlock().hash;
    const index = this.blocks.length;
    const feePerTx = this.getFeePerTx();
    const maxDifficulty = Blockchain.MAX_DIFFICULTY;

    return {
        data,
        difficulty,
        previousHash,
        index,
        feePerTx,
        maxDifficulty
    } as BlockInfo;
}
```

---

## 🌐 New Endpoint

### GET /blocks/next

Returns the information required to mine the next block.

```bash
curl http://localhost:3000/blocks/next
```

---

## 🧪 Tests Updates

### Blockchain Test

```ts
test('Should get next block Info', () => {
    const blockchain = new Blockchain();
    const nextBlockInfo = blockchain.getNextBlock();

    expect(nextBlockInfo.index).toEqual(1);
});
```

### Endpoint Test

```ts
test('GET /blocks/next', async () => {
    const response = await request(app).get('/blocks/next');

    expect(response.status).toEqual(200);
    expect(response.body.index).toEqual(1);
});
```

---

## ⛏️ Miner Client Prototype

Basic miner client to retrieve next block info from server.

**File:** `src/client/minerClient.ts`

```ts
import axios from 'axios';

const BLOCKCHAIN_SERVER = 'http://localhost:3000/';

async function mine(){
    const {data} = await axios.get(`${BLOCKCHAIN_SERVER}blocks/next`);
    console.log(data);
}

mine();
```

### Run Miner Client

```bash
npm run miner
```

---


## 🆕 Aula 10 - ProtoMiner Complete

### What's New

**Full miner client implementation** with environment variable management and continuous mining loop.

Miners can now connect to the blockchain server, retrieve mining parameters, and continuously submit mined blocks.

---

### Environment Variables (`.env` file)

Miner configuration via environment variables for flexibility and security:

```bash
# Blockchain server URL
BLOCKCHAIN_SERVER=http://localhost:3000/

# Express server port
BLOCKCHAIN_PORT=3000

# Miner wallet address (public key)
MINER_WALLET=your_miner_address
```

**Setup:**
1. Copy `.env.example` to `.env`
2. Update values for your environment
3. Run miner client with configured settings

---

### Block.fromBlockInfo() Static Method

New factory method to create Block instances from BlockInfo data:

```typescript
static fromBlockInfo(blockInfo: BlockInfo): Block {
    const block = new Block();
    block.index = blockInfo.index;
    block.previousHash = blockInfo.previousHash;
    block.data = blockInfo.data;
    return block;
}
```

**Usage:**
```typescript
const blockInfo = await axios.get(`${BLOCKCHAIN_SERVER}blocks/next`);
const newBlock = Block.fromBlockInfo(blockInfo);
```

---

### Enhanced Miner Client

**File:** `src/client/minerClient.ts`

Complete miner client with:
- Environment variable configuration
- Continuous mining loop
- Error handling
- Mining statistics

```typescript
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import BlockInfo from '../lib/blockInfo';
import Block from '../lib/block';

const BLOCKCHAIN_SERVER = process.env.BLOCKCHAIN_SERVER;

const minerWallet = {
    privateKey: "0x01745329",
    publicKey: `${process.env.MINER_WALLET}`
}

let totalMined = 0;

async function mine() {
    console.log("Getting next block info...");
    const { data } = await axios.get(`${BLOCKCHAIN_SERVER}blocks/next`);
    const blockInfo = data as BlockInfo;

    const newBlock = Block.fromBlockInfo(blockInfo);
    
    console.log("Start mining block #" + blockInfo.index);
    newBlock.mine(blockInfo.difficulty, minerWallet.publicKey);

    console.log("Block mined! Sending to Blockchain...");

    try {
        await axios.post(`${BLOCKCHAIN_SERVER}blocks/`, newBlock);
        console.log("Block sent and accepted!");
        totalMined++;
        console.log("Total mined blocks: " + totalMined);
    } catch (err: any) {
        console.error(err.response ? err.response.data : err.message);
    }

    setTimeout(() => {
        mine();
    }, 1000);
}

mine();
```

### Run the Complete Miner

**Terminal 1 - Start blockchain server:**
```bash
npm run blockchain
```

**Terminal 2 - Start miner client:**
```bash
npm run miner
```

**Example Output:**
```
Logged as your_miner_address
Getting next block info...
Start mining block #1
Block mined! Sending to Blockchain...
Block sent and accepted!
Total mined blocks: 1
Getting next block info...
```

### Key Features
- ✅ Environment variable configuration (dotenv)
- ✅ Continuous mining loop
- ✅ Block creation from BlockInfo
- ✅ Error handling and logging
- ✅ Mining statistics tracking
- ✅ Configurable miner wallet address
- ✅ Automatic block submission to server

---

## 🆕 Aula 11 - Transactions (Prototipal)

### What's New

Introduction of **Transaction** class and **TransactionType** enum for managing transactions on the blockchain.

---

### 💳 Transaction Class

**File:** `src/lib/transaction.ts`

```typescript
export default class Transaction {
    type: TransactionType;
    timestamp: number;
    hash: string;
    data: string;

    constructor(tx?: Transaction) {
        this.type = tx?.type || TransactionType.REGULAR;
        this.timestamp = tx?.timestamp || Date.now();
        this.data = tx?.data || "";
        this.hash = tx?.hash || this.getHash();
    }

    getHash(): string {
        return sha256(this.type + this.timestamp + this.data).toString();
    }

    isValid(): Validation {
        if (this.hash !== this.getHash())
            return new Validation(false, "Invalid hash.");
        if (!this.data)
            return new Validation(false, "Invalid data.");
        return new Validation();
    }
}
```

### TransactionType Enum

```typescript
enum TransactionType {
    REGULAR = 1,
    FEE = 2
}
```

### Key Features
- ✅ Transaction type support (REGULAR, FEE)
- ✅ SHA256 hash for integrity
- ✅ Automatic timestamp generation
- ✅ Validation system

---

## 🆕 Aula 12 - Transaction Integration

### What's New

Blocks now contain arrays of **transactions** instead of a single data field. Transaction validation is integrated into block validation using **high-order functions**.

---

### Block Updates

**Field Change:**
- Before: `data: string`
- After: `transactions: Transaction[]`

**Hash Calculation:**
Block hash now incorporates transaction hashes by concatenating them:

```typescript
const txs = this.transactions && this.transactions.length
    ? this.transactions.map(tx => tx.hash).reduce((a, b) => a + b)
    : "";
return sha256(this.index + txs + this.timestamp + this.previousHash + this.nonce + this.miner).toString()
```

---

### Transaction Validation with Higher-Order Functions

Blocks validate all transactions using **high-order functions** like `filter()`, `map()`, and `reduce()`:

```typescript
if(this.transactions && this.transactions.length){
    if(this.transactions.filter(tx => tx.type === TransactionType.FEE).length > 1) 
        return new Validation(false, "Too many fees.");
    
    const validations = this.transactions.map(tx => tx.isValid());
    const errors = validations.filter(v => !v.success).map(v => v.message);
    
    if(errors.length > 0) 
        return new Validation(false, "Invalid block due to invalid tx: " + errors.reduce((a,b) => a + b));
}
```

**HOF breakdown:**
- `filter()` - Ensures only one FEE transaction per block
- `map()` - Validates each transaction and collects validation results
- `reduce()` - Concatenates error messages into a single string

---

### BlockInfo Interface Update

```typescript
export default interface BlockInfo {
    index: number;
    previousHash: string;
    difficulty: number;
    maxDifficulty: number;
    feePerTx: number;
    transactions: Transaction[];  // Now includes transactions array
}
```

---

### Example - Block with Transactions

**Request:**
```bash
curl -X POST http://localhost:3000/blocks/ \
  -H "Content-Type: application/json" \
  -d '{
    "index": 1,
    "previousHash": "genesis_hash",
    "transactions": [
      {"type": 1, "data": "Alice → Bob: 10 tokens"},
      {"type": 2, "data": "Mining reward: 1 token"}
    ]
  }'
```

**Success Response (201):**
```json
{
  "index": 1,
  "previousHash": "genesis_hash",
  "transactions": [
    {"type": 1, "data": "Alice → Bob: 10 tokens", "hash": "..."},
    {"type": 2, "data": "Mining reward: 1 token", "hash": "..."}
  ],
  "hash": "...",
  "nonce": 42,
  "miner": "miner_wallet_address"
}
```

**Error Responses:**
- `400` - Too many FEE transactions (only 1 allowed per block)
- `400` - Invalid transaction in block (validation failed)
- `422` - Invalid block structure

### Key Features
- ✅ Multiple transactions per block
- ✅ Transaction validation via high-order functions
- ✅ Only one FEE transaction allowed per block
- ✅ Transaction hash concatenation in block hash
- ✅ Clear error messages for invalid transactions
- ✅ Functional programming patterns (filter, map, reduce)

---

## 🆕 Aula 13 - Transaction Testing

### What's New

**Comprehensive unit tests** for the Transaction class with full test coverage.

New **Transaction mock class** (`src/lib/__mocks__/transaction.ts`) for isolated testing.

Updated **Block tests** to work seamlessly with transaction arrays.

---

### Unit Tests for Transaction

**File:** `__tests__/transaction.test.ts`

Comprehensive test coverage for Transaction validation and integrity:

#### Test 1: Valid REGULAR Transaction

```typescript
test('Should be valid (REGULAR)', () => {
    const tx = new Transaction({
        data: "This is a goodamn transaction"
    } as Transaction)
    
    const valid = tx.isValid();
    expect(valid.success).toBeTruthy();
})
```

- ✅ Creates transaction with default REGULAR type
- ✅ Validates successful hash generation
- ✅ Confirms transaction integrity

#### Test 2: Valid FEE Transaction

```typescript
test('Should be valid (FEE)', () => {
    const tx = new Transaction({
        data: "This should represents a coinbase transaction",
        type: TransactionType.FEE
    } as Transaction)

    const valid = tx.isValid();
    expect(valid.success).toBeTruthy();
})
```

- ✅ Creates transaction with FEE type
- ✅ Validates FEE transaction structure
- ✅ Confirms both transaction types are supported

#### Test 3: Invalid Hash

```typescript
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
```

- ✅ Detects manually modified hash
- ✅ Fails validation when hash doesn't match computed hash
- ✅ Prevents hash tampering

#### Test 4: Empty Data

```typescript
test('Should NOT be valid (EMPTY DATA)', () => {
    const tx = new Transaction();

    const valid = tx.isValid();
    expect(valid.success).toBeFalsy();
})
```

- ✅ Rejects transactions with empty data
- ✅ Ensures all transactions contain meaningful data
- ✅ Validates required fields

---

### Transaction Mock Class

**File:** `src/lib/__mocks__/transaction.ts`

Mocked Transaction for isolated block testing:

```typescript
export default class Transaction {
    type: TransactionType;
    timestamp: number;
    hash: string;
    data: string;

    constructor(tx?: Transaction){
       this.type = tx?.type || TransactionType.REGULAR;
       this.timestamp = tx?.timestamp || Date.now();
       this.data = tx?.data || "";
       this.hash = tx?.hash || this.getHash()
    }

    getHash(): string {
        return "mocked transaction hash";
    }

    isValid(): Validation{
        if (!this.data) return new Validation(false, "Invalid mocked transaction.");
        return new Validation();
    }
}
```

**Benefits:**
- ✅ Simplifies block validation testing
- ✅ Provides predictable mock behavior
- ✅ Isolates transaction logic from block tests
- ✅ Reduces test complexity and execution time

---

### Block Test Integration

Updated block tests now use Transaction mock:

```typescript
jest.mock('../src/lib/transaction');

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
```

**Updates:**
- ✅ Mock Transaction integration with jest.mock()
- ✅ All block tests work with transaction arrays
- ✅ Full transaction validation coverage
- ✅ Comprehensive error handling tests

---

### Running Transaction Tests

```bash
# Run all tests including Transaction tests
npm test

# Run only Transaction tests
npm test -- transaction.test.ts

# Run with coverage report
npm test -- --coverage
```

---

### Test Coverage

| Component | Tests | Status |
|-----------|-------|--------|
| Transaction validation | 4 tests | ✅ Complete |
| REGULAR transactions | 1 test | ✅ Complete |
| FEE transactions | 1 test | ✅ Complete |
| Invalid hash detection | 1 test | ✅ Complete |
| Empty data validation | 1 test | ✅ Complete |
| Block + Transaction integration | Updated | ✅ Complete |
| Mock Transaction class | 1 file | ✅ Complete |

---

### Key Features
- ✅ Full Transaction class unit test coverage
- ✅ Both transaction types tested (REGULAR & FEE)
- ✅ Hash integrity validation
- ✅ Data validation (non-empty requirement)
- ✅ Transaction mock for block testing
- ✅ Integration with existing block tests
- ✅ 100% test isolation with mocking

---

## 🆕 Aula 14 - Mempool & Transaction Submission

### What's New

Introduction of **mempool (memory pool)** for managing pending transactions before they are included in blocks.

Users can now **submit transactions** to the mempool, and miners retrieve them from the mempool when building the next block — instead of creating fake transactions.

---

### 💾 Mempool: Transaction Queue

The **mempool** is a temporary storage for transactions awaiting confirmation:

- Transactions submitted via `POST /transactions` enter the mempool
- Miners retrieve pending transactions from mempool when mining
- Once a transaction is included in a block, it's removed from mempool
- Prevents duplicate transactions (checks both blockchain and mempool)

**Key Constants:**
```typescript
static readonly TX_PER_BLOCK = 2;  // Maximum transactions per block
```

---

### ⛓️ Blockchain Updates

#### New Mempool Property

```typescript
mempool: Transaction[];  // Queue of pending transactions
```

#### New Methods

**Add Transaction to Mempool:**
```typescript
addTransaction(transaction: Transaction): Validation {
    // Validates transaction integrity
    // Checks for duplicates in blockchain and mempool
    // Adds to mempool if valid
    // Returns validation result with transaction hash
}
```

**Get Transaction (Anywhere):**
```typescript
getTransaction(hash: string): TransactionSearch {
    // Searches for transaction in mempool first
    // If found: returns {transaction, mempoolIndex}
    // If not in mempool: searches blockchain blocks
    // If found in block: returns {transaction, blockIndex}
    // If not found: returns {blockIndex: -1, mempoolIndex: -1}
}
```

**Updated Block Validation:**
When adding a block, the blockchain now:
1. Validates block structure and mining
2. Verifies all regular transactions are in mempool
3. Removes confirmed transactions from mempool
4. Ensures no transaction is counted twice

---

### 📦 TransactionSearch Interface

New interface returned by `getTransaction()`:

```typescript
export default interface TransactionSearch {
    transaction: Transaction,
    mempoolIndex: number;    // -1 if not in mempool
    blockIndex: number;      // -1 if not in blockchain
}
```

**Usage:**
- `mempoolIndex >= 0` → Transaction is pending (in mempool)
- `blockIndex >= 0` → Transaction is confirmed (in block)
- Both -1 → Transaction not found

---

### 🌐 New Endpoints

#### GET /transactions - List Pending Transactions

Returns transactions ready to be mined:

```bash
curl http://localhost:3000/transactions/
```

**Success Response (200):**
```json
{
  "next": [
    {
      "type": 1,
      "timestamp": 1708812000000,
      "hash": "abc123...",
      "data": "Alice → Bob: 10 tokens"
    },
    {
      "type": 1,
      "timestamp": 1708812005000,
      "hash": "def456...",
      "data": "Bob → Charlie: 5 tokens"
    }
  ],
  "total": 7
}
```

**Fields:**
- `next`: Array of next transactions to be mined (up to TX_PER_BLOCK)
- `total`: Total pending transactions in mempool

---

#### GET /transactions/:hash - Search for Transaction

Find a specific transaction (in mempool or blockchain):

```bash
curl http://localhost:3000/transactions/abc123def456
```

**Success Response (200) - In Mempool:**
```json
{
  "transaction": {
    "type": 1,
    "timestamp": 1708812000000,
    "hash": "abc123...",
    "data": "Alice → Bob: 10 tokens"
  },
  "mempoolIndex": 0,
  "blockIndex": -1
}
```

**Success Response (200) - In Blockchain:**
```json
{
  "transaction": {
    "type": 2,
    "timestamp": 1708811990000,
    "hash": "fee789...",
    "data": "Mining reward: 1 token"
  },
  "mempoolIndex": -1,
  "blockIndex": 2
}
```

**Success Response (200) - Not Found:**
```json
{
  "transaction": null,
  "mempoolIndex": -1,
  "blockIndex": -1
}
```

---

#### POST /transactions - Submit Transaction to Mempool

Add a new transaction to the mempool:

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": 1,
    "data": "Alice → Bob: 10 tokens"
  }'
```

**Success Response (201):**
```json
{
  "type": 1,
  "timestamp": 1708812000000,
  "hash": "abc123def456...",
  "data": "Alice → Bob: 10 tokens"
}
```

**Error Responses:**
- `422` - Missing required fields (`hash` required in request body)
- `400` - Transaction validation failed (invalid hash, empty data, etc.)
- `400` - Duplicate transaction (already in blockchain or mempool)

---

### 🔄 Mining Integration

**Before (Aula 13):**
```typescript
getNextBlock(): BlockInfo {
    const transactions = [new Transaction ({
        data: new Date().toString()  // Fake transaction!
    } as Transaction)];
    // ...
}
```

**After (Aula 14):**
```typescript
getNextBlock(): BlockInfo | null {
    if(!this.mempool || !this.mempool.length)
        return null;  // No transactions to mine

    const transactions = this.mempool.slice(0, Blockchain.TX_PER_BLOCK);
    // ...
}
```

Miners now:
1. Call `GET /transactions` to see pending transactions
2. Submit `POST /blocks` with real transactions from mempool
3. Block is validated and mempool is cleaned up

---

### 🛠️ Updated Miner Client

Miners should now:
1. Get next block info: `GET /blocks/next`
2. Check pending transactions: `GET /transactions`
3. Include real transactions in the block instead of fake ones
4. Submit block: `POST /blocks`

---

### Key Features
- ✅ Mempool for pending transactions
- ✅ Transaction submission via API
- ✅ Duplicate transaction prevention
- ✅ Transaction search (anywhere)
- ✅ Real transactions in mined blocks
- ✅ Automatic mempool cleanup
- ✅ Transaction count limit per block (TX_PER_BLOCK)
- ✅ Backward compatibility with existing endpoints

---

---
## 🧪 Testing

The project includes unit tests to validate the functionality of the main classes.

To run tests:
```bash
npm test
```

To view test coverage:
```bash
npm test -- --coverage
```

---

## 📚 Educational Concepts Covered

- ✅ **Cryptographic Hash**: SHA256 for data integrity
- ✅ **Block Structure**: index, timestamp, hash, previousHash, data
- ✅ **Integrity Validation**: Hash verification
- ✅ **Chain of Blocks**: Sequential linking with previous hashes
- ✅ **Immutability**: Impossibility of altering data without breaking the chain
- ✅ **Transactions**: Data stored in blocks
- ✅ **Digital Wallets**: Wallet management
- ✅ **REST API**: Local server for blockchain operations (Aula 04+)

---

## 📌 Course Progress & Versions

| Aula | Topic | Changes | Version |
|------|-------|---------|---------|
| **01-03** | Core Blockchain | Block, Blockchain, Wallet, Validation, KeyWord | v0.1.0 |
| **04** | Local Server | Express API server for blockchain requests | v0.2.0 |
| **05** | Server Enhancement | POST /blocks endpoint, fallbacks, type casting | v0.3.0 |
| **06** | Mocking Classes | Jest mock classes (`__mocks__/`) for unit testing | v0.4.0 |
| **07** | Supertest Integration | Integration testing for blockchainServer endpoints | v0.5.0 |
| **08** | ProtoMiner (PoW) | Mining, nonce, miner, dynamic difficulty | v0.6.0 |
| **09** | Block Info & Miner Client | BlockInfo interface, next block endpoint, miner client | v0.7.0 |
| **10** | ProtoMiner Complete | Environment variables, continuous mining loop, factory method | v0.8.0 |
| **11** | Transactions (Prototipal) | Transaction class, TransactionType enum | v0.9.0 |
| **12** | Transaction Integration | Transaction arrays in blocks, HOF validation, single FEE per block | v0.10.0 |
| **13** | Transaction Testing | Unit tests for Transaction class, mock class, integration with blocks | v0.11.0 |
| **14** | Mempool & Transaction Submission | Mempool queue, transaction submission API, real transactions in blocks | v0.12.0 |

### Current Status
- **Latest Complete Aula**: 14 ✅
- **Current Development**: Aula 15 🚀
- **Branch Strategy**: `feature/XX` → `develop` → Release tags (v0.X.X)

---

## 🎓 For Students

This is an excellent project for:

1. **Learning fundamentals** of blockchain before studying real implementations
2. **Understanding basic cryptography** and hash functions
3. **Practicing TypeScript** with a real project
4. **Writing unit tests** with Jest
5. **Understanding data validation** and integrity

### Next Steps (In Progress)

Course roadmap:
- ✅ **Aula 01-03**: Core blockchain implementation
- ✅ **Aula 04**: Express server for API requests
- ✅ **Aula 05**: Server enhancements and new features
- ✅ **Aula 06**: Jest mocking for unit testing
- ✅ **Aula 07**: Integration testing with Supertest
- ✅ **Aula 08**: Proof of Work (PoW) implementation
- ✅ **Aula 09**: Block info interface and miner client prototype
- ✅ **Aula 10**: Complete miner client with environment variables
- ✅ **Aula 11**: Transaction support (prototipal)
- ✅ **Aula 12**: Transaction support (integration)
- ✅ **Aula 13**: Transaction testing, mock class, update Block tests
- ✅ **Aula 14**: Mempool and transaction submission via API
- 🔜 **Future Aulas**: 

  - Creating a digital signature system
  - Wallet balance tracking
  - Studying Smart Contracts (EVM)

---

## 📦 Dependencies

### Production
- **crypto-js**: Cryptographic library with SHA256

### Development
- **TypeScript**: JavaScript superset with static typing
- **Jest**: Testing framework
- **ts-jest**: Preprocessor for running TypeScript with Jest
- **ts-node**: TypeScript executor
- **@types/\***: Type definitions for libraries

---

## 🤝 Contributing

To contribute improvements:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is under the **MIT** license. See the LICENSE file for more details.

---

## 👨‍🏫 Course

**Instructor**: Prof. Luiz Tools  
**Topic**: Web3 - Blockchain Fundamentals  
**Project**: Protochain - Educational Blockchain Implementation

---

## 📧 Contact

**Developer**: Victor Ritcov  
**GitHub**: [@Ritcov](https://github.com/Ritcov)  
**Repository**: [protochain-web23Course](https://github.com/Ritcov/protochain-web23Course)

---

## 🙏 Acknowledgments

- Prof. Luiz Tools for excellent teaching in the Web3 course
- Blockchain community for continuous education
- Jest, TypeScript, and crypto-js for amazing tools

---

**⭐ If this project was helpful, leave a star on the repository!**

Made with ❤️ for learning blockchain fundamentals.
