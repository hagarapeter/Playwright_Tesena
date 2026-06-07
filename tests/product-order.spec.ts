import { test } from "../fixtures/base";
import { POManager } from "../pages/POManager";
import { expect } from "@playwright/test";

test.describe.serial(`Product ordering tests @smoke`, () => {
  let poManager: POManager;
  test.beforeEach(async ({ page, testDataForOrder }) => {
    poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.Login(
      testDataForOrder.username,
      testDataForOrder.password,
    );
  });

  test(`Add product from Art category to cart and verify it there`, async ({ page, testDataForOrder }) => {
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.navigateToCategoryArt();
    await dashboardPage.findProduct(testDataForOrder.productName);

    const productDetailsPage = poManager.getProductDetailsPage();
    await productDetailsPage.addToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.checkout();
    await cartPage.verifyItem(testDataForOrder.productName);

    //webpage does not allow adding payment method, so it's not possible to finish the order
  });
  
  test(`Verify the ordered product in the order history`, async ({ page, testDataForOrder }) => {
    const userProfilePage = poManager.getUserProfilePage();
    await userProfilePage.goTo();
    await userProfilePage.orderHistoryAndDetails();

    //cannot verify product as the product is not actually ordered
    await expect(page).toHaveURL(/.*order-history/);
    const orderHistoryAlertLocator = page.getByText('You have not placed any orders.');
    await expect(orderHistoryAlertLocator).toBeVisible();

  });
});