import { type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  products: Locator;
  categoryArt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".h3.product-title");
    this.categoryArt = page.getByText("Art", { exact: true });
  }

  async navigateToCategoryArt() {
    await this.categoryArt.click();
    await this.page.waitForLoadState("networkidle");
  }

  async findProduct(productName: string) {
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      const text = await this.products.nth(i).locator("a").textContent();
      if (text?.toLowerCase().includes(productName.toLowerCase())) {
        await this.products.nth(i).locator("a").click();
        break;
      }
    }
  }


}
