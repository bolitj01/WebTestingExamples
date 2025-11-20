import "@4tw/cypress-drag-drop";

//Use this to reset the database before running tests
// before(() => {
//     //Reset database and populate with empty rooms
//     cy.request("POST", "http://localhost:8080/clear-database").should(
//       (response) => {
//         expect(response.status).to.eq(200);
//       }
//     );
//     cy.request("POST", "http://localhost:8080/create-rooms", { roomCount: 10 }).should(
//       (response) => {
//         expect(response.status).to.eq(200);
//       }
//     );
//   });