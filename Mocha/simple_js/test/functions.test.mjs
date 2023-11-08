//Beginner test using Jest
import { sum, cloneArray } from "../functions.mjs";
import {expect} from "chai";

it("Pending test will not pass or fail");

describe("Math", function () {
    it("Add two numbers", function () {
        let result = sum(1, 2);
        expect(result).to.equal(3);
    })
});

describe("Array", function () {
    it("Clone array", function () {
        const nums = [1, 2, 3];
        expect(cloneArray(nums)).to.eql(nums); //Same values
        expect(cloneArray(nums)).to.not.equal(nums); //Not pointing to the same object
        //One-liner: expect(cloneArray(nums)).to.eql(nums).but.not.equal(nums)
    })
});