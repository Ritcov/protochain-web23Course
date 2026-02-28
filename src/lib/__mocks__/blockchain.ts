import Block from "./block";
import Validation from '../validation';
import BlockInfo from "../blockInfo";

/**
 * Mocked Blockchain class
 */
export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;
    static readonly DIFFICULTY_FACTOR = 5;
    static readonly MAX_DIFFICULTY = 62;

    /**
     * Creates a new mocked blockchain
     * Initiate with a genesis block
     */
    constructor(){
        this.blocks = [new Block({
            data: "Genesis Block",
            hash: "mocked-genesis-hash"
        } as Block)];
        this.nextIndex++;
    }

    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1];
    }

    getDifficulty(): number {
        return Math.ceil(this.blocks.length / Blockchain.DIFFICULTY_FACTOR);
    }
    
    /**
     * Add a new valid mocked block in a mocked blockchain
     * @param block THe mock block that will be added
     * @returns If it was a vallid block to be added
     */
    addBlock(block: Block) : Validation {
        if(block.index < 0) return new Validation(false, "Invalid mock block (index)");

        this.blocks.push(block);
        this.nextIndex++;
        
        return new Validation(); 
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
     * Validation the blockchain
     * @returns Returns if the entire Blockchain is valid
     */
    isValid(): Validation {
        return new Validation();
    }

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
}