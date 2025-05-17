Feature: Checkout Functionality
  As a user of SauceDemo
  I want to be able to checkout with my items
  So that I can complete my purchase

  Background:
    Given I am logged in as "standard_user"
    And I have added "Sauce Labs Backpack" to the cart
    And I navigate to the cart page

  Scenario: Complete checkout with valid information
    When I click the checkout button
    And I enter checkout information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click the continue button
    Then I should be on the checkout overview page
    And I should see "Sauce Labs Backpack" in the checkout
    When I click the finish button
    Then I should see the thank you message
    And I should be on the checkout complete page

  Scenario: Checkout with missing first name
    When I click the checkout button
    And I enter checkout information:
      | firstName | lastName | postalCode |
      |           | Doe      | 12345      |
    And I click the continue button
    Then I should see an error message "Error: First Name is required"

  Scenario: Checkout with missing last name
    When I click the checkout button
    And I enter checkout information:
      | firstName | lastName | postalCode |
      | John      |          | 12345      |
    And I click the continue button
    Then I should see an error message "Error: Last Name is required"

  Scenario: Checkout with missing postal code
    When I click the checkout button
    And I enter checkout information:
      | firstName | lastName | postalCode |
      | John      | Doe      |            |
    And I click the continue button
    Then I should see an error message "Error: Postal Code is required"
    
  Scenario: Cancel checkout from information page
    When I click the checkout button
    And I click the cancel button
    Then I should be back on the cart page
    
  Scenario: Verify price calculations
    Given I have emptied my cart
    And I have added "Sauce Labs Backpack" to the cart
    And I have added "Sauce Labs Bike Light" to the cart
    And I navigate to the cart page
    When I click the checkout button
    And I enter checkout information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click the continue button
    Then The subtotal should match the sum of all items
    And The tax should be calculated correctly
    And The total should equal subtotal plus tax
