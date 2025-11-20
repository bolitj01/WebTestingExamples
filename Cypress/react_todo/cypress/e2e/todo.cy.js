import { db } from "../../src/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

describe("Todo actions", () => {
  beforeEach(async () => {
    if (!db) {
      throw new Error("Firestore not found");
    }
    //Delete all todos from firestore
    const q = collection(db, "todos");
    const snap = await getDocs(q);
    snap.forEach(async (d) => {
      console.log(d);
      await deleteDoc(doc(db, "todos", d.id));
    });
    cy.visit("http://localhost:5173/");
  });
  it("Add a todo item", () => {
    //Ensure no li present
    cy.get("li").should("not.exist");
    cy.get('[data-testid="todo-text"]').type("New todo item");
    cy.get('[data-testid="todo-add"]').click();
    cy.get("li").should("have.length", 1);
    cy.get('[data-testid="count"]').should("have.text", "You have 1 todos");
  });
  it("Delete a todo item", () => {
    cy.get('[data-testid="todo-text"]').type("New todo item");
    cy.get('[data-testid="todo-add"]').click();
    cy.get("li").should("have.length", 1);
    cy.get('[data-testid="todo-delete"]').click();
    cy.get("li").should("not.exist");
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Toggle todo", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="todo-text"]').type("New todo item");
    cy.get('[data-testid="todo-add"]').click();
    cy.get("li").should("have.length", 1);
    cy.get('[data-testid="todo-checkbox"]').should("not.be.checked");
    cy.get('[data-testid="todo-checkbox"]').check();
    cy.get('[data-testid="todo-checkbox"]').should("be.checked");
    cy.get('[data-testid="todo-checkbox"]').uncheck();
    cy.get('[data-testid="todo-checkbox"]').should("not.be.checked");
    /* ==== End Cypress Studio ==== */
  });
});
