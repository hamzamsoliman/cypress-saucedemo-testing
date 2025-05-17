/**
 * Base page object containing common methods and elements for all pages
 */
class BasePage {
  /**
   * Navigate to a specific page
   * @param {string} path - The path to navigate to
   */
  visit(path = '') {
    cy.visit(path);
  }

  /**
   * Get page title
   * @returns {Cypress.Chainable} - The page title
   */
  getTitle() {
    return cy.title();
  }

  /**
   * Wait for a specified time
   * @param {number} milliseconds - The time to wait in milliseconds
   */
  wait(milliseconds) {
    cy.wait(milliseconds);
  }

  /**
   * Click the burger menu button
   */
  clickBurgerMenu() {
    cy.get('#react-burger-menu-btn').click();
    // Wait for the menu to be visible
    cy.get('.bm-menu-wrap').should('have.attr', 'aria-hidden', 'false');
  }

  /**
   * Get the shopping cart badge count
   * @returns {Cypress.Chainable} - The cart count
   */
  getCartCount() {
    return cy.get('.shopping_cart_badge').then($badge => {
      if ($badge.length > 0) {
        return parseInt($badge.text());
      }
      return 0;
    });
  }

  /**
   * Click on shopping cart
   */
  clickCart() {
    cy.get('.shopping_cart_link').click();
  }

  /**
   * Log out from the application
   */
  logout() {
    this.clickBurgerMenu();
    cy.get('#logout_sidebar_link').click();
  }

  /**
   * Reset the app state
   */
  resetAppState() {
    this.clickBurgerMenu();
    cy.get('#reset_sidebar_link').click();
  }
}

export default BasePage;
