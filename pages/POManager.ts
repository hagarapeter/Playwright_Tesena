import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { UserProfilePage } from "./UserProfile";
import { ProductDetailsPage } from "./ProductDetails";
import { type Page } from "@playwright/test";

export class POManager {
  page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
  userProfilePage: UserProfilePage;
  productDetailsPage: ProductDetailsPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.userProfilePage = new UserProfilePage(this.page);
    this.productDetailsPage = new ProductDetailsPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getUserProfilePage() {
    return this.userProfilePage;
  }

  getProductDetailsPage() {
    return this.productDetailsPage;
  }
}
