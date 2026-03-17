import Block from "./block";
import Validation from './validation';
import BlockInfo from "./blockInfo";
import Transaction from "./transaction";
import TransactionType from "./transactionType";
import TransactionSearch from "./transactionSearch";
/**
 * Blockchain class
 */
export default class Blockchain {
    blocks: Block[];
    mempool: Transaction[];
    nextIndex: number = 0;

    static readonly DIFFICULTY_FACTOR = 5;
    static readonly TX_PER_BLOCK = 2;
    static readonly MAX_DIFFICULTY = 62;

    /**
     * Creates a new blockchain
     * Initiate with a genesis block
     */
    constructor(){
        this.mempool = [];
        this.blocks = [new Block({
            index: this.nextIndex,
            transactions: [new Transaction({
                type: TransactionType.FEE,
                data: new Date().toString()
            } as Transaction)] 
        } as Block)];
        this.nextIndex++;
    }

    /**
     * Get a current FEE price
     * @returns The current price FEE per Transaction
     */
    getFeePerTx(): number {
        return 1;
    }

    /**
     * Get the current difficulty
     * @returns The current difficulty in Blockchain
     */
    getDifficulty(): number {
        return Math.ceil(this.blocks.length / Blockchain.DIFFICULTY_FACTOR);
    }

    /**
     * Get the last Block pushed in Blockchain
     * @returns The last Block added to Blockchain
     */
    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1];
    }

    /**
     * Get a blockchain's block by hash
     * @param hash Hash of some blockchain's block
     * @returns Returns a block with param's hash, if it exist. Or undefined if not
     */
    getBlock(hash: string): Block | undefined {
        return this.blocks.find(b => b.hash === hash);
    }
    
    /**
     * Add a new transaction in mempool
     * @param transaction A transactions information that should be add
     * @returns True if the transactions is valid or false if not
     */
    addTransaction(transaction: Transaction): Validation {
        const validation = transaction.isValid();
        if(!validation.success)
            return new Validation(false, "Invalid tx:" + validation.message);
        
        if(this.blocks.some(b => b.transactions.some(tx => tx.hash === transaction.hash)))
            return new Validation(false, "Duplicated tx in Blockchain."); 

        if(this.mempool.some(tx => tx.hash === transaction.hash))
            return new Validation(false, "Duplicated tx in mempool");

        this.mempool.push(transaction);
        return new Validation(true, transaction.hash);
    }

    /**
     * Find the transaction if it already existis in some block or mempool
     * @param hash A transaction hash
     * @returns The transaction information, if it existis, and the position of it, on mempool or block
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
     * Add a new valid block in blockchain
     * @param block THe block that will be added
     * @returns The validade of the block to be added
     */
    addBlock(block: Block) : Validation {
        const lastBlock = this.getLastBlock();
        const difficulty = this.getDifficulty();

        const validation = block.isValid(lastBlock.hash, lastBlock.index, difficulty);
        if(!validation.success)
            return new Validation(false,`Invalid block #${block.index}: ${validation.message}`);

        //Filter only REGULAR transactions and create a hash array from them
        const txs = block.transactions.filter(tx => tx.type !== TransactionType.FEE).map(tx => tx.hash);
        const newMempoll = this.mempool.filter(tx => !txs.includes(tx.hash));
        
        for(let i=0; i < txs.length ; i++){
            if(!this.mempool.map(tx => tx.hash).includes(txs[i])) return new Validation(false, "Transaction do not belong to mempool:" + txs[i]);
        }

        if(newMempoll.length + txs.length !== this.mempool.length) return new Validation(false, "Invalid Transactions"); 

        this.mempool = newMempoll;
         
        this.blocks.push(block);
        this.nextIndex++;
        
        return new Validation(true, block.hash); 
    }
    
    
    /**
     * Validation the blockchain
     * @returns Returns if the entire Blockchain is valid
     */
    isValid(): Validation {
        for(let i=this.blocks.length - 1; i > 0; i--){
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i-1];
            const validation = currentBlock.isValid(previousBlock.hash, previousBlock.index, this.getDifficulty());
            if(!validation.success) 
                return new Validation(false, `Invalid block #${currentBlock.index}: ${validation.message}`);
        }
        return new Validation();
    }

    
    /**
     * Get the information for Build the next Blcok
     * @returns The Block information for build new next Block
     */
    getNextBlock(): BlockInfo | null {
        if(!this.mempool || !this.mempool.length)
            return null;

        const transactions = this.mempool.slice(0, Blockchain.TX_PER_BLOCK);
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