import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  page: Page;
  checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByRole('link', { name: 'Proceed to checkout' })
  }

  async verifyItems(productName: string) {
    await this.getProductLocator(productName).waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
    if (!bool) {
      throw new Error(`Product ${productName} is not present`);
    }
  }

  getProductLocator(productName: string) {
    return this.page.getByAltText(productName)
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}
