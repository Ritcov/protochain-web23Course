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
│   └── lib/
│       ├── block.ts          # Block Class - Represents a single block
│       ├── blockchain.ts     # Blockchain Class - Manages the chain
│       ├── wallet.ts         # Wallet Class - Manages digital wallets
│       ├── validation.ts     # Validation Class - Validation system
│       └── keyWord.ts        # KeyWord Class - Key generation
├── __tests__/                # Unit tests with Jest
├── dist/                     # Compiled code (JavaScript)
├── coverage/                 # Test coverage report
├── tsconfig.json            # TypeScript configuration
├── jest.config.ts           # Jest configuration
├── package.json             # Project dependencies
└── README.md                # This file
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
| **crypto-js** | ^4.2.0 | Cryptographic functions (SHA256) |
| **Jest** | ^30.2.0 | Testing framework |
| **ts-jest** | ^29.4.6 | Jest + TypeScript integration |
| **ts-node** | ^10.9.2 | Direct TypeScript execution |

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

---

## 🎓 For Students

This is an excellent project for:

1. **Learning fundamentals** of blockchain before studying real implementations
2. **Understanding basic cryptography** and hash functions
3. **Practicing TypeScript** with a real project
4. **Writing unit tests** with Jest
5. **Understanding data validation** and integrity

### Next Steps

After mastering this project, consider:
- Adding **transaction support**
- Implementing **Proof of Work** (mining)
- Creating a **digital signature system**
- Studying **Smart Contracts** (EVM)

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

This project is under the **ISC** license. See the LICENSE file for more details.

---

## 👨‍🏫 Course

**Instructor**: Prof. Luiz Tools  
**Topic**: Web3 - Blockchain Fundamentals  
**Project**: Protochain - Educational Blockchain Implementation

---

## 📧 Contact

**Developer**: Ritcov  
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
