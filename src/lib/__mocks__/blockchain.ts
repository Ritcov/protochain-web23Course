import Block from "./block";
import Validation from '../validation';
import BlockInfo from "../blockInfo";
import Transaction from "./transaction";
import TransactionType from "../transactionType";
import TransactionSearch from "../transactionSearch";

/**
 * Mocked Blockchain class
 */
export default class Blockchain {
    blocks: Block[];
    mempool: Transaction[];
    nextIndex: number = 0;
    static readonly DIFFICULTY_FACTOR = 5;
    //static readonly TX_PER_BLOCK = 2;
    static readonly MAX_DIFFICULTY = 62;
    

    /**
     * Creates a new mocked blockchain
     * Initiate with a genesis block
     */
    constructor(){
        this.mempool = [];
        this.blocks = [new Block({
            transactions: [new Transaction({
                type: TransactionType.FEE,
                data: "Genesis mocked block",
                hash: "genesis-mocked-transaction-hash"
            } as Transaction)],
            hash: "genesis-mocked-hash"
        } as Block)];
        this.nextIndex++;
    }

    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1];
    }

    getDifficulty(): number {
        return Math.ceil(this.blocks.length / Blockchain.DIFFICULTY_FACTOR);
    }

    getFeePerTx(): number {
        return 1;
    }

    /**
     * Get a blockchain's block by hash
     * @param hash Hash of some blockchain's block
     * @returns Returns a block with params hash, if it exist. Or undefined if not
     */
    getBlock(hash: string): Block | undefined {
        return this.blocks.find(b => b.hash === hash);
    }

    /**
     * Add a new mocked transaction in mempool
     * @param transaction A transactions information that should be add
     * @returns True if the mocked transactions is valid or false if it's not
     */
    addTransaction(transaction: Transaction): Validation {
        const validation = transaction.isValid();
        if(!validation.success)
            return new Validation(false, "Invalid tx:" + validation.message);

        this.mempool.push(transaction);
        return new Validation(true, transaction.hash);
    }

    /**
     * Find the mocked transaction if it already existis in some block or mempool
     * @param hash A transaction hash
     * @returns The transaction information, if it existis, and the position of it in mempool or block
     */
    getTransaction(hash: string): TransactionSearch {
        const mempoolIndex = this.mempool.findIndex(tx => tx.hash === hash);
        if(mempoolIndex !== -1)
            return {transaction: this.mempool[mempoolIndex], mempoolIndex} as TransactionSearch;

        const blockIndex = this.blocks.findIndex(b => b.transactions.some(tx => tx.hash === hash));
        if(blockIndex !== -1)
            return {
                blockIndex,
                transaction: this.blocks[blockIndex].transactions.find(tx => tx.hash === hash)
            } as TransactionSearch;

        return { blockIndex: -1, mempoolIndex: -1} as TransactionSearch;
    }    
    
    /**
     * Add a new valid mocked Block in a mocked Blockchain
     * @param block The mock Block that will be added
     * @returns If it was a vallid Block to be added
     */
    addBlock(block: Block) : Validation {
        if(block.index < 0) return new Validation(false, "Invalid mock block (index)");

        this.blocks.push(block);
        this.nextIndex++;
        
        return new Validation(); 
    }
    
    /**
     * Validation the blockchain
     * @returns Returns if the entire Blockchain is valid
     */
    isValid(): Validation {
        return new Validation();
    }


    getNextBlock(): BlockInfo | null {
        const transactions = [new Transaction({
            data: new Date().toString()
        } as Transaction)];
        const difficulty = this.getDifficulty();
        const previousHash = this.getLastBlock().hash;
        const index = this.blocks.length;
        const feePerTx = this.getFeePerTx();
        const maxDifficulty = Blockchain.MAX_DIFFICULTY;

        return {
            transactions,
            difficulty,
            previousHash,
            index,
            feePerTx,
            maxDifficulty
        } as BlockInfo;
    }    
}