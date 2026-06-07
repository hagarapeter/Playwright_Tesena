import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class UserProfilePage extends BasePage {
  customerAccount: Locator;
  wishlists: Locator;
  orderHistory: Locator;
  confirmRemovalBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.customerAccount = page.getByTitle('View my customer account', { exact: true });
    this.wishlists = page.getByRole('link', { name: 'favorite My wishlists' });
    this.orderHistory = page.getByRole('link', { name: ' Order history and details' });
    this.confirmRemovalBtn = page.getByRole('button', { name: 'Remove' });
  }

  async goTo() {
    await this.customerAccount.click();
  }

  async myWishlists() {
    await this.wishlists.click();
    await this.page.locator('a.wishlist-list-item-link').click();
  }

  protected getProductLocator(productName: string) {
    return this.page.getByAltText(productName)
  }

  protected getProductsLocator(): Locator {
    return this.page.locator('.wishlist-products-item');
  }

  async orderHistoryAndDetails() {
    await this.orderHistory.click();
  }

  async removeFromWishlist(productName: string) {
    const products = this.getProductsLocator();
    await products.first().waitFor();
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
      const text = await products.nth(i).locator("p.wishlist-product-title").textContent();
      if (text?.toLowerCase().includes(productName.toLowerCase())) {
        await products.nth(i).locator('button').nth(1).click();
        await this.confirmRemovalBtn.click();
        break;
      }
    }
  }
  
  async verifyEmptyWishlist() {
    await expect(this.page.locator('.wishlist-products-item')).toHaveCount(0);
  }
}