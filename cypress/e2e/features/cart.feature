Feature: Shopping Cart Functionality
  As a user of SauceDemo
  I want to be able to add and remove items from my cart
  So that I can manage my purchases

  Background:
    Given I am logged in as "standard_user"
    And I am on the inventory page

  Scenario: Add single item to cart
    When I add "Sauce Labs Backpack" to the cart
    Then The cart badge count should be "1"
    And The item "Sauce Labs Backpack" should have a "Remove" button

  Scenario: Add multiple items to cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then The cart badge count should be "2"

  Scenario: Remove item from cart on inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I remove "Sauce Labs Backpack" from the cart
    Then The cart badge count should be "0"
    And The item "Sauce Labs Backpack" should have an "Add to cart" button

  Scenario: View cart contents
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    And I navigate to the cart page
    Then I should see "Sauce Labs Backpack" in the cart
    And I should see "Sauce Labs Bike Light" in the cart

  Scenario: Remove item from cart page
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    And I remove "Sauce Labs Backpack" from the cart
    Then The item "Sauce Labs Backpack" should not be in the cart
