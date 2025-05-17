const { When, Then } = require('cypress-cucumber-preprocessor').given;
const InventoryPage = require('../pages/InventoryPage');

const inventoryPage = new InventoryPage();

When('I sort products by {string}', (sortOption) => {
  inventoryPage.sortItems(sortOption);
});

Then('Products should be sorted alphabetically from A to Z', () => {
  // Get all product names and verify they are in alphabetical order (A-Z)
  cy.get('.inventory_item_name').then($items => {
    const itemNames = [...$items].map(el => el.innerText);
    const sortedNames = [...itemNames].sort();
    expect(itemNames).to.deep.equal(sortedNames);
  });
});

Then('Products should be sorted alphabetically from Z to A', () => {
  // Get all product names and verify they are in reverse alphabetical order (Z-A)
  cy.get('.inventory_item_name').then($items => {
    const itemNames = [...$items].map(el => el.innerText);
    const sortedNames = [...itemNames].sort().reverse();
    expect(itemNames).to.deep.equal(sortedNames);
  });
});

Then('Products should be sorted by price from low to high', () => {
  // Get all product prices and verify they are in ascending order
  cy.get('.inventory_item_price').then($prices => {
    const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
  });
});

Then('Products should be sorted by price from high to low', () => {
  // Get all product prices and verify they are in descending order
  cy.get('.inventory_item_price').then($prices => {
    const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).to.deep.equal(sortedPrices);
  });
});
