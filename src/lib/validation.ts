/**
 * Validation class
 */
export default class Validation {
    success: boolean;
    message: string;

    /**
     * Creates a new validation object
     * @param successInput If the validation was successful
     * @param messageInput The validation message, if the valifation failed
     */
    constructor(successInput: boolean = true, messageInput: string = ""){
        this.success = successInput;
        this.message = messageInput;
    }
}