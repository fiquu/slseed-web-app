// https://docs.cypress.io/api/introduction/api.html

describe('Welcome screen', function () {
  before(function() {
    cy.visit('/#/users/sign-in');
  });

  beforeEach(function() {
    cy.get('#form-input-38').clear();
    cy.get('#form-input-42').clear();
  });

  it('Shows the sign in page', function () {
    cy.contains('div.content', 'Welcome');
  });

  it('Visually validates short email input', function () {
    cy.get('#form-input-38').parent('.field').type('sh').should('have.class', 'error');
    cy.get('.form > button.primary').should('have.attr', 'disabled');
  });

  it('Visually validates invalid email input', function () {
    cy.get('#form-input-38').parent('.field').type('not an em@il').should('have.class', 'error');
    cy.get('.form > button.primary').should('have.attr', 'disabled');
  });

  it('Visually validates short password', function () {
    cy.get('#form-input-42').parent('.field').type('short').should('have.class', 'error');
    cy.get('.form > button.primary').should('have.attr', 'disabled');
  });

  it('Inputs sign in data', function () {
    cy.get('#form-input-38').type('address@example.com').should('have.value', 'address@example.com');
    cy.get('#form-input-42').type('notarealpassword').should('have.value', 'notarealpassword');
    cy.get('.form > button.primary').should('not.have.attr', 'disabled');
  });
});
