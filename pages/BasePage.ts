import { expect, type Page, type Locator } from "@playwright/test";

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyItem(productName: string) {
        await expect(this.getProductLocator(productName)).toBeVisible();
    }

    protected getProductLocator(productName: string): Locator {
        throw new Error('getProductLocator must be implemented by subclass');
    }

    async findProduct(productName: string) {
        const products = this.getProductsLocator();
        await products.first().waitFor();
        const count = await products.count();
        for (let i = 0; i < count; ++i) {
            const text = await products.nth(i).locator("a").textContent();
            if (text?.toLowerCase().includes(productName.toLowerCase())) {
                await products.nth(i).locator("a").click();
                break;
            }
        }
    }

    protected getProductsLocator(): Locator {
        return this.page.locator("h2.product-title");
    }
}