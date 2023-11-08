import Stack from "../stack.mjs"
import { expect } from "chai"

describe("Stack", function () {
    //Satisfy these tests in order
    it("is initially empty", function () {
        const stack = new Stack();
        expect(stack.top).to.equal(-1);
    });

    it("pushes to the top", function () {
        const stack = new Stack();
        stack.push(5);
        expect(stack.top).to.equal(5);
        stack.push("test");
        expect(stack.top).to.equal("test");
    });

    it("pops from the top", function () {
        const stack = new Stack();
        stack.push(5);
        stack.push("test");
        let top = stack.pop();
        expect(top).to.equal("test")
    });


})