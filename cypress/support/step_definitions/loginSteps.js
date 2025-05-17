const { Given, When, Then } = require('cypress-cucumber-preprocessor').given;
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

// Background steps
Given('I am on the login page', () => {
  loginPage.visit();
});

// When steps
When('I enter {string} as username', (username) => {
  loginPage.enterUsername(username);
});

When('I enter {string} as password', (password) => {
  loginPage.enterPassword(password);
});

When('I click the login button', () => {
  loginPage.clickLoginButton();
});

// Given combined step for other features to use
Given('I am logged in as {string}', (username) => {
  loginPage.visit();
  loginPage.login(username, 'secret_sauce');
  inventoryPage.isLoaded();
});

// Then steps
Then('I should be redirected to inventory page', () => {
  inventoryPage.isLoaded();
});

Then('I should see an error message {string}', (message) => {
  loginPage.verifyErrorMessage(message);
});
