import Block from "./block";
import Validation from './validation';

/**
 * Blockchain class
 */
export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;
    static readonly DIFFICULTY_FACTOR = 5;

    /**
     * Creates a new blockchain
     * Initiate with a genesis block
     */
    constructor(){
        this.blocks = [new Block({
            index: this.nextIndex,
            data: "Genesis Block"
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
     * Add a new valid block in blockchain
     * @param block THe block that will be added
     * @returns If is vallid block to be added
     */
    addBlock(block: Block) : Validation {
        const lastBlock = this.getLastBlock();

        const validation = block.isValid(lastBlock.hash, lastBlock.index, this.getDifficulty());
        if(!validation.success)
            return new Validation(false,`Invalid block #${block.index}: ${validation.message}`);

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
        for(let i=this.blocks.length - 1; i > 0; i--){
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i-1];
            const validation = currentBlock.isValid(previousBlock.hash, previousBlock.index, this.getDifficulty());
            if(!validation.success) 
                return new Validation(false, `Invalid block #${currentBlock.index}: ${validation.message}`);
        }
        return new Validation();
    }
}