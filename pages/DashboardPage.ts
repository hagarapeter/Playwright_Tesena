import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
  page: Page;
  categoryArt: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.categoryArt = page.getByText("Art", { exact: true });
  }

  async navigateToCategoryArt() {
    await this.categoryArt.click();
    await this.page.waitForLoadState("networkidle");
  }

  protected getProductsLocator(): Locator {
    return this.page.locator("h2.product-title");
  }


}
