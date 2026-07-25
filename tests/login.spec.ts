import { test, expect } from '../src/fixtures/pages.fixture';

test.describe('SauceDemo login', () => {
  test('standard user logs in and lands on the inventory page', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('locked out user sees an error message', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('adding an item updates the cart badge', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart('Sauce Labs Backpack');

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
