import "@4tw/cypress-drag-drop";

describe("room admin tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("adds a new participant to the waiting room", () => {
    cy.get('[data-testid="name-text"]').type("Tommy");
    cy.get('[data-testid="add-button"]').click();
    cy.get('[data-testid="participant-name"]').should("contain", "Tommy");
    cy.get('[data-testid="waiting-room"]').should("contain", "Tommy");
  });

  it("drags a user from waiting room to a room", () => {
    cy.get('[data-testid="participant-name"]').drag('[data-testid="room-2"]');
    cy.get('[data-testid="room-2"]').should("contain", "Tommy");
  });

  it("drags a user from room to a different room", () => {
    cy.get('[data-testid="room-2"] > [data-testid="participant-name"]').drag('[data-testid="room-5"]');
    cy.get('[data-testid="room-5"]').should("contain", "Tommy");
  });
});
