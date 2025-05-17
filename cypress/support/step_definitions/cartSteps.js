const { Given, When, Then } = require('cypress-cucumber-preprocessor').given;
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');

const inventoryPage = new InventoryPage();
const cartPage = new CartPage();

// Background steps
Given('I am on the inventory page', () => {
  inventoryPage.visit();
  inventoryPage.isLoaded();
});

// When steps
When('I add {string} to the cart', (itemName) => {
  inventoryPage.addItemToCart(itemName);
});

When('I remove {string} from the cart', (itemName) => {
  // Handle removal from both inventory and cart pages
  cy.url().then(url => {
    if (url.includes('inventory.html')) {
      inventoryPage.removeItemFromCart(itemName);
    } else if (url.includes('cart.html')) {
      cartPage.removeItem(itemName);
    }
  });
});

When('I navigate to the cart page', () => {
  inventoryPage.clickCart();
  cartPage.isLoaded();
});

// Given combined steps for other features to use
Given('I have added {string} to the cart', (itemName) => {
  inventoryPage.visit();
  inventoryPage.isLoaded();
  inventoryPage.addItemToCart(itemName);
});

Given('I have emptied my cart', () => {
  // Reset app state which clears the cart
  inventoryPage.resetAppState();
});

// Then steps
Then('The cart badge count should be {string}', (count) => {
  if (count === '0') {
    // When cart is empty, badge may not be present
    cy.get('.shopping_cart_badge').should('not.exist');
  } else {
    cy.get('.shopping_cart_badge').should('have.text', count);
  }
});

Then('The item {string} should have a {string} button', (itemName, buttonText) => {
  inventoryPage.getInventoryItemByName(itemName)
    .find('button')
    .should('contain', buttonText);
});

Then('The item {string} should have an {string} button', (itemName, buttonText) => {
  inventoryPage.getInventoryItemByName(itemName)
    .find('button')
    .should('contain', buttonText);
});

Then('I should see {string} in the cart', (itemName) => {
  cartPage.verifyItemInCart(itemName);
});

Then('The item {string} should not be in the cart', (itemName) => {
  cy.get('.cart_item .inventory_item_name').should('not.contain', itemName);
});
