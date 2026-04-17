import { type Locator, type Page } from "@playwright/test";

export class ProductDetailsPage {
  page: Page;
  cart: Locator;
  favorite: Locator;
  selectWishlist: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart = page.locator("button:has-text('Add To Cart')")
    this.favorite =  page.locator('button.wishlist-button-add.wishlist-button-product');
    this.selectWishlist =  page.getByText('My wishlist');
  }

  async addToCart() {
    await this.cart.click();
    await this.page.waitForLoadState("networkidle");
  }

  async addToWishlist() {
    await this.favorite.click();
    await this.selectWishlist.click();
    await this.page.waitForLoadState("networkidle");
  }

}
