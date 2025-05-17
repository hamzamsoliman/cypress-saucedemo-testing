import BasePage from './BasePage';

/**
 * Page object for the Checkout pages
 */
class CheckoutPage extends BasePage {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.checkoutStepOnePath = '/checkout-step-one.html';
    this.checkoutStepTwoPath = '/checkout-step-two.html';
    this.checkoutCompletePath = '/checkout-complete.html';
    
    // Form elements
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '#continue';
    this.cancelButton = '#cancel';
    this.errorMessage = '[data-test="error"]';
    
    // Checkout overview elements
    this.finishButton = '#finish';
    this.inventoryItem = '.cart_item';
    this.inventoryItemName = '.inventory_item_name';
    this.inventoryItemPrice = '.inventory_item_price';
    this.subtotalLabel = '.summary_subtotal_label';
    this.taxLabel = '.summary_tax_label';
    this.totalLabel = '.summary_total_label';
    
    // Checkout complete elements
    this.completeHeader = '.complete-header';
    this.completeText = '.complete-text';
    this.backHomeButton = '#back-to-products';
  }

  /**
   * Visit the checkout step one page
   */
  visitCheckoutStepOne() {
    super.visit(this.checkoutStepOnePath);
  }

  /**
   * Visit the checkout step two page
   */
  visitCheckoutStepTwo() {
    super.visit(this.checkoutStepTwoPath);
  }

  /**
   * Visit the checkout complete page
   */
  visitCheckoutComplete() {
    super.visit(this.checkoutCompletePath);
  }

  /**
   * Check if checkout step one page is loaded
   */
  isCheckoutStepOneLoaded() {
    cy.url().should('include', this.checkoutStepOnePath);
    cy.get(this.firstNameInput).should('be.visible');
  }

  /**
   * Check if checkout step two page is loaded
   */
  isCheckoutStepTwoLoaded() {
    cy.url().should('include', this.checkoutStepTwoPath);
    cy.get(this.finishButton).should('be.visible');
  }

  /**
   * Check if checkout complete page is loaded
   */
  isCheckoutCompleteLoaded() {
    cy.url().should('include', this.checkoutCompletePath);
    cy.get(this.completeHeader).should('be.visible');
  }

  /**
   * Fill out customer information
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  fillCustomerInfo(firstName, lastName, postalCode) {
    cy.get(this.firstNameInput).clear().type(firstName);
    cy.get(this.lastNameInput).clear().type(lastName);
    cy.get(this.postalCodeInput).clear().type(postalCode);
  }

  /**
   * Click the continue button
   */
  clickContinue() {
    cy.get(this.continueButton).click();
  }

  /**
   * Click the cancel button
   */
  clickCancel() {
    cy.get(this.cancelButton).click();
  }

  /**
   * Complete the checkout process
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  completeCheckout(firstName, lastName, postalCode) {
    this.fillCustomerInfo(firstName, lastName, postalCode);
    this.clickContinue();
  }

  /**
   * Verify error message on checkout form
   * @param {string} message - Expected error message
   */
  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should('be.visible').and('contain', message);
  }

  /**
   * Get all checkout items in step two
   * @returns {Cypress.Chainable} - List of checkout items
   */
  getCheckoutItems() {
    return cy.get(this.inventoryItem);
  }

  /**
   * Verify an item is in the checkout
   * @param {string} itemName - Name of the item to check
   */
  verifyItemInCheckout(itemName) {
    cy.get(this.inventoryItemName).should('contain', itemName);
  }

  /**
   * Get the subtotal amount
   * @returns {Cypress.Chainable} - The subtotal amount
   */
  getSubtotal() {
    return cy.get(this.subtotalLabel)
      .invoke('text')
      .then(text => {
        return parseFloat(text.match(/\$([0-9.]+)/)[1]);
      });
  }

  /**
   * Get the tax amount
   * @returns {Cypress.Chainable} - The tax amount
   */
  getTax() {
    return cy.get(this.taxLabel)
      .invoke('text')
      .then(text => {
        return parseFloat(text.match(/\$([0-9.]+)/)[1]);
      });
  }

  /**
   * Get the total amount
   * @returns {Cypress.Chainable} - The total amount
   */
  getTotal() {
    return cy.get(this.totalLabel)
      .invoke('text')
      .then(text => {
        return parseFloat(text.match(/\$([0-9.]+)/)[1]);
      });
  }

  /**
   * Click the finish button
   */
  clickFinish() {
    cy.get(this.finishButton).click();
  }

  /**
   * Verify order completion
   */
  verifyOrderComplete() {
    cy.get(this.completeHeader).should('contain', 'Thank you for your order');
  }

  /**
   * Click the back home button
   */
  clickBackHome() {
    cy.get(this.backHomeButton).click();
  }
}

export default CheckoutPage;
