import { test } from "../utils/test-base";
import { POManager } from "../pageobjects/POManager";

//find product from data file, add to cart, verify that correct product was added

test(`Add product to cart and verify it`, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password,
  );

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.navigateToCategoryArt();
  await dashboardPage.findProduct(testDataForOrder.productName);

  const productDetailsPage = poManager.getProductDetailsPage();
  await productDetailsPage.addToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.checkout();
  await cartPage.verifyItems(testDataForOrder.productName);
  
  //here we end at having the product in cart and verifying that the correct product is there

});


