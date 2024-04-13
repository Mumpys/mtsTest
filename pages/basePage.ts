import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;
  private readonly path: string;
  constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;
  }

  async open() {
    return this.page.goto(this.path);
  }

  async newTabHandler(newTabAction) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      newTabAction,
    ]);
    return newPage;
  }
}
