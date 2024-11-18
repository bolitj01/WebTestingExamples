import React from 'react';
import { mount } from 'cypress/react';
import Todo from '../../src/components/Todo';
import '../../src/index.css'; // Ensure this path points to your Tailwind CSS file

describe('Todo Component', () => {
  const todo = { id: 1, text: 'Test Todo', completed: false };
  let toggleComplete;
  let deleteTodo;

  beforeEach(() => {
    toggleComplete = cy.spy().as('toggleCompleteSpy');
    deleteTodo = cy.spy().as('deleteTodoSpy');
    mount(<Todo todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />);
  });

  it('renders the todo item', () => {
    cy.get('li').should('contain.text', 'Test Todo');
  });

  it('applies the correct styles', () => {
    cy.get('li').should('have.class', 'flex')
      .and('have.class', 'justify-between')
      .and('have.class', 'bg-slate-200')
      .and('have.class', 'p-4')
      .and('have.class', 'my-2')
      .and('have.class', 'capitalize');
  });

  it('checkbox toggles completion status', () => {
    cy.get('input[type="checkbox"]').should('not.be.checked');
    cy.get('input[type="checkbox"]').click();
    cy.get('@toggleCompleteSpy').should('have.been.calledWith', todo);
  });

  it('delete button works', () => {
    cy.get('[data-testid="todo-delete"]').click();
    cy.get('@deleteTodoSpy').should('have.been.calledWith', todo.id);
  });
});