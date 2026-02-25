import Validation from '../validation';

/**
 * Mocked block class
 */
export default class Block {
    index: number;
    timestamp: number;
    hash: string;
    previousHash: string;
    data: string;

    /**
     * Creates a new mock block
     * @param block The mock block data
     */
    constructor(block?: Block) {
        this.index = block?.index || 0;
        this.timestamp= block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || "";
        this.data = block?.data || "";
        this.hash = block?.hash || this.getHash(); 
        
    }

    /**
     * Create a block's hash.
     * @returns Ruturn an hash with 256 bytes formed by concat index, block's data, timestamp, previous hash
     */
    getHash(): string {
        return this.hash || "Mock Hash"
    }
    /**
     * Validates the mock block
     * @returns Returns if the mock block is valid
     */
    isValid(previousHash: string, previousIndex: number): Validation{
        if (!previousHash || previousIndex < 0 || this.index < 0)
            return new Validation(false, "Invalid mock block.");
        return new Validation();
    }
}