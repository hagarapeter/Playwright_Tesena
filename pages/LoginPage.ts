import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  signInButton: Locator;
  username: Locator;
  password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator("button[type='submit']");
    this.username = page.getByRole("textbox", { name: "Email" });
    this.password = page.getByRole("textbox", { name: "Password" });
  }

  async goTo() {
    await this.page.goto("http://37.27.17.198:8084/en/login");
  }

  async Login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
