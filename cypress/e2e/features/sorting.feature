Feature: Product Sorting Functionality
  As a user of SauceDemo
  I want to be able to sort products
  So that I can find items more easily

  Background:
    Given I am logged in as "standard_user"
    And I am on the inventory page

  Scenario: Sort products by name (A to Z)
    When I sort products by "az"
    Then Products should be sorted alphabetically from A to Z

  Scenario: Sort products by name (Z to A)
    When I sort products by "za"
    Then Products should be sorted alphabetically from Z to A

  Scenario: Sort products by price (low to high)
    When I sort products by "lohi"
    Then Products should be sorted by price from low to high

  Scenario: Sort products by price (high to low)
    When I sort products by "hilo"
    Then Products should be sorted by price from high to low
