import { test } from "../fixtures/base";
import { POManager } from "../pages/POManager";

test.describe.serial(`Wishlist`, () => {
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
  
  test(`Add product to wishlist, verify it's there`, async ({ page, testDataForOrder }) => {
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.navigateToCategoryArt();
    await dashboardPage.findProduct(testDataForOrder.productName);

    const productDetailsPage = poManager.getProductDetailsPage();
    await productDetailsPage.addToWishlist();

    const userProfilePage = poManager.getUserProfilePage();
    await userProfilePage.goTo();
    await userProfilePage.myWishlists();
    await userProfilePage.verifyItem(testDataForOrder.productName);
  });

  test(`Remove product from wishlist, verify list is empty`, async ({ page, testDataForOrder }) => {
    const userProfilePage = poManager.getUserProfilePage();
    await userProfilePage.goTo();
    await userProfilePage.myWishlists();
    await userProfilePage.verifyItem(testDataForOrder.productName);

    await userProfilePage.removeFromWishlist(testDataForOrder.productName);
    await userProfilePage.verifyEmptyWishlist();
  });
});