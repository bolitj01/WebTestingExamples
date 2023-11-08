//Beginner test using Jest
import {sum, cloneArray} from "./functions";

it("Test description", () => {
    //Operations
    //Test Expectations / Assertions
});

it("Add two numbers", () => {
    let result = sum(1, 2);
    expect(result).toBe(3);
})


test("Clone array", () => {
    const nums = [1, 2, 3];
    expect(cloneArray(nums)).toEqual(nums); //Same values
    expect(cloneArray(nums)).not.toBe(nums); //Not pointing to the same object
})