import { test, expect, type Locator, type Page } from "@playwright/test";

export class UserProfilePage {
  page: Page;
  customerAccount: Locator;
  wishlists: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customerAccount = page.getByTitle('View my customer account', { exact: true });
    this.wishlists = page.getByText('favorite', { exact: true })
  }


  async goTo() {
    await this.customerAccount.click();
  }

  async myWishlists() {
    await this.wishlists.click();
    await this.page.locator('a.wishlist-list-item-link').click();
  }
}
