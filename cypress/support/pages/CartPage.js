const BasePage = require('./BasePage');

/**
 * Page object for the Cart page
 */
class CartPage extends BasePage {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.url = '/cart.html';
    this.cartList = '.cart_list';
    this.cartItem = '.cart_item';
    this.cartItemName = '.inventory_item_name';
    this.cartItemPrice = '.inventory_item_price';
    this.cartItemQuantity = '.cart_quantity';
    this.removeButton = 'button.cart_button';
    this.checkoutButton = '#checkout';
    this.continueShoppingButton = '#continue-shopping';
  }

  /**
   * Visit the cart page
   */
  visit() {
    super.visit(this.url);
  }

  /**
   * Check if cart page is loaded
   */
  isLoaded() {
    cy.url().should('include', this.url);
    cy.get(this.cartList).should('be.visible');
  }

  /**
   * Get all cart items
   * @returns {Cypress.Chainable} - List of cart items
   */
  getCartItems() {
    return cy.get(this.cartItem);
  }

  /**
   * Get count of cart items
   * @returns {Cypress.Chainable} - Count of cart items
   */
  getCartItemCount() {
    return cy.get(this.cartItem).its('length');
  }

  /**
   * Get a cart item by name
   * @param {string} itemName - Name of the item to find
   * @returns {Cypress.Chainable} - The cart item
   */
  getCartItemByName(itemName) {
    return cy.get(this.cartItemName)
      .contains(itemName)
      .parents(this.cartItem);
  }

  /**
   * Check if an item is in the cart
   * @param {string} itemName - Name of the item to check
   */
  verifyItemInCart(itemName) {
    cy.get(this.cartItemName).should('contain', itemName);
  }

  /**
   * Remove an item from cart by name
   * @param {string} itemName - Name of the item to remove
   */
  removeItem(itemName) {
    this.getCartItemByName(itemName)
      .find(this.removeButton)
      .click();
  }

  /**
   * Get the quantity of an item by name
   * @param {string} itemName - Name of the item
   * @returns {Cypress.Chainable} - The quantity of the item
   */
  getItemQuantity(itemName) {
    return this.getCartItemByName(itemName)
      .find(this.cartItemQuantity)
      .invoke('text')
      .then(text => {
        return parseInt(text, 10);
      });
  }

  /**
   * Get the price of an item by name
   * @param {string} itemName - Name of the item
   * @returns {Cypress.Chainable} - The price of the item
   */
  getItemPrice(itemName) {
    return this.getCartItemByName(itemName)
      .find(this.cartItemPrice)
      .invoke('text')
      .then(text => {
        return parseFloat(text.replace('$', ''));
      });
  }

  /**
   * Click the checkout button
   */
  clickCheckout() {
    cy.get(this.checkoutButton).click();
  }

  /**
   * Click the continue shopping button
   */
  clickContinueShopping() {
    cy.get(this.continueShoppingButton).click();
  }
}

module.exports = CartPage;
