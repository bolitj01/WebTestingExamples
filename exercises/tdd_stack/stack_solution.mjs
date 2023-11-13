/**
 * Handles a stack that behaves according to
 * the LIFO (Last In, First Out) principle.
 */
class Stack {
    constructor(){
        this.top = -1;
        this.data = [];
    }
    push(data){
        this.data = [data, ...this.data];
        this.top = this.data[0];
    }
    pop(){
        this.data = this.data.slice(1, this.data.length);
        let oldTop = this.top;
        this.top = this.data[0];
        return oldTop;
    }
}

export default Stack;