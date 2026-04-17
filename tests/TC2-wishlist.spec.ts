import { test } from "../utils/test-base";
import { POManager } from "../pageobjects/POManager";

//find product from data file, add to wishlist, verify that correct product was added, add to cart

test(`Add product to wishlist, verify it, add to cart`, async ({ page, testDataForOrder }) => {
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
  await productDetailsPage.addToWishlist();

  const userProfilePage = poManager.getUserProfilePage();
  await userProfilePage.goTo();
  await userProfilePage.myWishlists();
   
  const cartPage = poManager.getCartPage();
  await cartPage.verifyItems(testDataForOrder.productName);



});
