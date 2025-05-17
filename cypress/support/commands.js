// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for login
Cypress.Commands.add('login', (username, password) => {
  cy.get('#user-name').clear().type(username);
  cy.get('#password').clear().type(password);
  cy.get('#login-button').click();
});

// Custom command to check if login was successful
Cypress.Commands.add('verifyLoginSuccess', () => {
  cy.url().should('include', '/inventory.html');
  cy.get('.inventory_list').should('be.visible');
});

// Custom command to check if login failed
Cypress.Commands.add('verifyLoginFailed', (errorMessage) => {
  cy.get('[data-test="error"]').should('be.visible');
  if (errorMessage) {
    cy.get('[data-test="error"]').should('contain', errorMessage);
  }
});

// Custom command to add an item to cart
Cypress.Commands.add('addToCart', (itemName) => {
  cy.get('.inventory_item_name')
    .contains(itemName)
    .parents('.inventory_item')
    .find('button')
    .contains('Add to cart')
    .click();
});

// Custom command to remove an item from cart
Cypress.Commands.add('removeFromCart', (itemName) => {
  cy.get('.inventory_item_name')
    .contains(itemName)
    .parents('.inventory_item')
    .find('button')
    .contains('Remove')
    .click();
});

// Custom command to go to cart
Cypress.Commands.add('goToCart', () => {
  cy.get('.shopping_cart_link').click();
});

// Custom command to checkout
Cypress.Commands.add('checkout', (firstName, lastName, postalCode) => {
  cy.get('#checkout').click();
  cy.get('#first-name').clear().type(firstName);
  cy.get('#last-name').clear().type(lastName);
  cy.get('#postal-code').clear().type(postalCode);
  cy.get('#continue').click();
});

// Custom command to complete order
Cypress.Commands.add('completeOrder', () => {
  cy.get('#finish').click();
  cy.url().should('include', '/checkout-complete.html');
  cy.get('.complete-header').should('contain', 'Thank you for your order');
});

// Custom command to logout
Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
});
