import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { CartPage, CheckoutPage } from '../pages';

const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

// When steps
When('I click the checkout button', () => {
  cartPage.clickCheckout();
  checkoutPage.isCheckoutStepOneLoaded();
});

When('I enter checkout information:', (dataTable) => {
  const userInfo = dataTable.hashes()[0];
  checkoutPage.fillCustomerInfo(userInfo.firstName, userInfo.lastName, userInfo.postalCode);
});

When('I click the continue button', () => {
  checkoutPage.clickContinue();
});

When('I click the cancel button', () => {
  checkoutPage.clickCancel();
});

When('I click the finish button', () => {
  checkoutPage.clickFinish();
});

// Then steps
Then('I should be on the checkout overview page', () => {
  checkoutPage.isCheckoutStepTwoLoaded();
});

Then('I should see {string} in the checkout', (itemName) => {
  checkoutPage.verifyItemInCheckout(itemName);
});

Then('I should see the thank you message', () => {
  cy.get('.complete-header').should('contain', 'Thank you for your order');
});

Then('I should be on the checkout complete page', () => {
  checkoutPage.isCheckoutCompleteLoaded();
});

Then('I should be back on the cart page', () => {
  cartPage.isLoaded();
});

Then('The subtotal should match the sum of all items', () => {
  // Get all item prices
  let calculatedSubtotal = 0;
  cy.get('.cart_item').each(($item) => {
    cy.wrap($item).find('.inventory_item_price').invoke('text').then(text => {
      calculatedSubtotal += parseFloat(text.replace('$', ''));
    });
  }).then(() => {
    // Compare with displayed subtotal
    checkoutPage.getSubtotal().then(subtotal => {
      expect(subtotal).to.be.closeTo(calculatedSubtotal, 0.01);
    });
  });
});

Then('The tax should be calculated correctly', () => {
  // Assume tax is 8% of subtotal (common in many states)
  checkoutPage.getSubtotal().then(subtotal => {
    const expectedTax = subtotal * 0.08;
    checkoutPage.getTax().then(tax => {
      expect(tax).to.be.closeTo(expectedTax, 0.01);
    });
  });
});

Then('The total should equal subtotal plus tax', () => {
  checkoutPage.getSubtotal().then(subtotal => {
    checkoutPage.getTax().then(tax => {
      const expectedTotal = subtotal + tax;
      checkoutPage.getTotal().then(total => {
        expect(total).to.be.closeTo(expectedTotal, 0.01);
      });
    });
  });
});
