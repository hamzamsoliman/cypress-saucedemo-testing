import BasePage from './BasePage';

/**
 * Page object for the Login page
 */
class LoginPage extends BasePage {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.url = '/';
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  /**
   * Visit the login page
   */
  visit() {
    super.visit(this.url);
  }

  /**
   * Enter username
   * @param {string} username - Username to enter
   */
  enterUsername(username) {
    cy.get(this.usernameInput).clear().type(username);
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   */
  enterPassword(password) {
    cy.get(this.passwordInput).clear().type(password);
  }

  /**
   * Click the login button
   */
  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  /**
   * Login with credentials
   * @param {string} username - Username to use
   * @param {string} password - Password to use
   */
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  /**
   * Check if error message is displayed
   * @param {string} message - Expected error message
   */
  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should('be.visible').and('contain', message);
  }

  /**
   * Get the error message text
   * @returns {Cypress.Chainable} - The error message text
   */
  getErrorMessage() {
    return cy.get(this.errorMessage).invoke('text');
  }
}

export default LoginPage;
