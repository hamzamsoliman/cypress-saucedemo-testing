Feature: Login Functionality
  As a user of SauceDemo
  I want to be able to login with my credentials
  So that I can access the products page

  Background:
    Given I am on the login page

  Scenario: Successful login with standard user
    When I enter "standard_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be redirected to inventory page

  Scenario: Failed login with locked out user
    When I enter "locked_out_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."

  Scenario: Failed login with invalid credentials
    When I enter "invalid_user" as username
    And I enter "invalid_password" as password
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with problem user
    When I enter "problem_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be redirected to inventory page

  Scenario: Login with performance glitch user
    When I enter "performance_glitch_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be redirected to inventory page
