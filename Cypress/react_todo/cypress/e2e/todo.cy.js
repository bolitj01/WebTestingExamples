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
    cy.get('li').should('not.exist');
    cy.get('[data-testid="todo-text"]').type("New todo item");
    cy.get('[data-testid="todo-add"]').click();
    cy.get('li').should('have.length', 1);    
  });
  it ("Delete a todo item", () => {
    cy.get('[data-testid="todo-text"]').type("New todo item");
    cy.get('[data-testid="todo-add"]').click();
    cy.get('li').should('have.length', 1);
    cy.get('[data-testid="todo-delete"]').click();
    cy.get('li').should('not.exist');
  });
});
