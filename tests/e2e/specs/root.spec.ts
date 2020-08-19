// https://docs.cypress.io/api/introduction/api.html

describe('Welcome screen', function () {
  it('Redirects to the sign in page', function () {
    cy.visit('/');
    cy.url().should('include', '/#/users/sign-in');
  });
});
