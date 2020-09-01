// https://docs.cypress.io/api/introduction/api.html

describe('Welcome screen', function () {
  before(function () {
    cy.visit('/#/users/sign-in');
  });

  beforeEach(function () {
    cy.get('#email-input-33').clear();
    cy.get('#password-input-39').clear();
  });

  it('Shows the sign in page', function () {
    cy.get('.font-bold').contains('Welcome');
  });

  it('Visually validates short email input', function () {
    cy.get('#email-input-33').type('sh').closest('.el-form-item').should('have.class', 'is-error')
      .find('.el-form-item__error').should('not.be.empty');
    cy.get('#submit-button-26').should('have.attr', 'disabled');
  });

  it('Visually validates invalid email input', function () {
    cy.get('#email-input-33').type('not an em@il').closest('.el-form-item').should('have.class', 'is-error')
      .find('.el-form-item__error').should('not.be.empty');
    cy.get('#submit-button-26').should('have.attr', 'disabled');
  });

  it('Visually validates short password', function () {
    cy.get('#password-input-39').type('short').closest('.el-form-item').should('have.class', 'is-error')
      .find('.el-form-item__error').should('not.be.empty');
    cy.get('#submit-button-26').should('have.attr', 'disabled');
  });

  it('Inputs sign in data', function () {
    cy.get('#email-input-33').type('address@example.com').should('have.value', 'address@example.com')
      .closest('.el-form-item').should('have.class', 'is-success')
      .find('.el-form-item__error').should('not.exist');
    cy.get('#password-input-39').type('notarealpassword').should('have.value', 'notarealpassword')
      .closest('.el-form-item').should('have.class', 'is-success')
      .find('.el-form-item__error').should('not.exist');
    cy.get('#submit-button-26').should('not.have.attr', 'disabled');
  });
});
