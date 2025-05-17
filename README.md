# SauceDemo Testing Project

This is a comprehensive test automation framework for the [SauceDemo](https://www.saucedemo.com/) website using Cypress with Cucumber (BDD) integration.

## Features

- Page Object Model design pattern for better maintainability
- Cucumber BDD integration for behavior-driven development
- Custom Cypress commands for code reusability
- GitHub Actions integration for CI/CD
- Headless test execution in CI pipeline

## Project Structure

```
cypress/
├── e2e/
│   └── features/        # Cucumber feature files
├── fixtures/            # Test data files
└── support/
    ├── pages/           # Page Object classes
    ├── step_definitions/ # Cucumber step implementations
    ├── commands.js      # Custom Cypress commands
    └── e2e.js           # Configuration for e2e tests
```

## Page Objects

The framework implements the Page Object Model (POM) design pattern with the following pages:
- `BasePage`: Common functionality shared across all pages
- `LoginPage`: Login page functionality
- `InventoryPage`: Product listing page functionality
- `CartPage`: Shopping cart functionality
- `CheckoutPage`: Checkout process functionality

## Test Scenarios

The test suite covers:
- Login functionality with different user types
- Shopping cart operations (add/remove items)
- Product sorting functionality
- Checkout process validation
- Form validation

## Prerequisites

- Node.js (v16+)
- npm (v8+)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cypress-saucedemo-testing.git
   cd cypress-saucedemo-testing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Run tests in headless mode:
```bash
npm test
```

### Run tests in Cypress UI:
```bash
npm run test:open
```

### Run tests in specific browser:
```bash
npm run test:chrome
# or
npm run test:firefox
```

## CI/CD Integration

This project includes GitHub Actions workflow configuration to automatically run tests on push and pull requests to the main branch. The workflow:
1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Runs Cypress tests in headless mode

## Requirements Implementation

The project satisfies the following requirements:
1. ✅ Page objects for all test cases (20 marks)
2. ✅ Custom commands and multiple test cases (15 marks)
3. ✅ GitHub integration with public repository (10 marks)
4. ✅ Running tests headless using GitHub Actions (5 marks)
5. ✅ Step definitions using Cucumber BDD instead of Mocha (20 marks)

All test cases are implemented using custom commands and page objects as specified in the requirements.

## License

ISC
