const BasePage = require('./BasePage');

/**
 * Page object for the Inventory page
 */
class InventoryPage extends BasePage {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.url = '/inventory.html';
    this.inventoryList = '.inventory_list';
    this.inventoryItem = '.inventory_item';
    this.inventoryItemName = '.inventory_item_name';
    this.inventoryItemDescription = '.inventory_item_desc';
    this.inventoryItemPrice = '.inventory_item_price';
    this.addToCartButton = 'button.btn_inventory';
    this.removeButton = 'button.btn_secondary';
    this.cartBadge = '.shopping_cart_badge';
    this.sortDropdown = '[data-test="product_sort_container"]';
  }

  /**
   * Visit the inventory page
   */
  visit() {
    super.visit(this.url);
  }

  /**
   * Check if inventory page is loaded
   */
  isLoaded() {
    cy.url().should('include', this.url);
    cy.get(this.inventoryList).should('be.visible');
  }

  /**
   * Get all inventory items
   * @returns {Cypress.Chainable} - List of inventory items
   */
  getInventoryItems() {
    return cy.get(this.inventoryItem);
  }

  /**
   * Get count of inventory items
   * @returns {Cypress.Chainable} - Count of inventory items
   */
  getInventoryItemCount() {
    return cy.get(this.inventoryItem).its('length');
  }

  /**
   * Get an inventory item by name
   * @param {string} itemName - Name of the item to find
   * @returns {Cypress.Chainable} - The inventory item
   */
  getInventoryItemByName(itemName) {
    return cy.get(this.inventoryItemName)
      .contains(itemName)
      .parents(this.inventoryItem);
  }

  /**
   * Add an item to cart by name
   * @param {string} itemName - Name of the item to add
   */
  addItemToCart(itemName) {
    this.getInventoryItemByName(itemName)
      .find(this.addToCartButton)
      .contains('Add to cart')
      .click();
  }

  /**
   * Remove an item from cart by name
   * @param {string} itemName - Name of the item to remove
   */
  removeItemFromCart(itemName) {
    this.getInventoryItemByName(itemName)
      .find(this.removeButton)
      .contains('Remove')
      .click();
  }

  /**
   * Get the price of an item by name
   * @param {string} itemName - Name of the item
   * @returns {Cypress.Chainable} - The price of the item
   */
  getItemPrice(itemName) {
    return this.getInventoryItemByName(itemName)
      .find(this.inventoryItemPrice)
      .invoke('text')
      .then(text => {
        return parseFloat(text.replace('$', ''));
      });
  }

  /**
   * Sort the inventory items
   * @param {string} option - Sort option ('az', 'za', 'lohi', 'hilo')
   */
  sortItems(option) {
    cy.get(this.sortDropdown).select(option);
  }
}

module.exports = InventoryPage;
