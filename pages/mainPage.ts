import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class MainPage extends BasePage {
  readonly videoCategoryLocator: Locator;
  readonly authorTitle: Locator;
  readonly cardAvatar: Locator;
  readonly videoDescription: Locator;
  readonly subscribeButton: Locator;
  readonly subscribeButtonAncestor: Locator;
  readonly sidebarVideoButton: Locator;
  readonly firstVideoLabel: Locator;
  readonly selectedVideoCategory: Locator;

  constructor(page: Page, path: string) {
    super(page, path);

    this.videoCategoryLocator = this.page.getByTestId(
      'floor-title-long_video_floor'
    );
    this.firstVideoLabel = this.page.getByTestId('long_video_floor').first();
    this.authorTitle = this.firstVideoLabel.locator(
      '//span[starts-with(@class,"author-title")]'
    );
    this.cardAvatar = this.firstVideoLabel.getByLabel('Аватар канала');
    this.videoDescription = this.firstVideoLabel.locator(
      '//div[starts-with(@class,"card-part-title")]'
    );
    this.subscribeButton = this.firstVideoLabel.locator(
      '//button[@aria-label="Подписаться"]'
    );
    this.subscribeButtonAncestor = this.firstVideoLabel.locator(
      '//*[@class="subscribe-button__button-3n"]'
    );
    this.sidebarVideoButton = this.page.getByLabel('Видео', { exact: true });
    this.selectedVideoCategory = this.sidebarVideoButton.locator('//li');
  }
  async scrollOnVideoSection() {
    return await this.videoCategoryLocator.scrollIntoViewIfNeeded();
  }

  async checkVideoCardsContent(locator: Locator) {
    const cardElements = await locator.all();
    expect(cardElements.length).not.toBe([]);

    for (const element of cardElements) {
      await element.isVisible();
      const titleText = await element.textContent();
      expect(titleText).not.toBe('');
    }
  }

  async checkVideoCardsAvatar() {
    const cardElements = await this.cardAvatar.all();
    expect(cardElements.length).not.toBe([]);
    for (const element of cardElements) {
      await element.isVisible();
    }
  }

  async checkVideoCardsTitle() {
    await this.checkVideoCardsContent(this.authorTitle);
  }

  async checkVideoCardsDescription() {
    await this.checkVideoCardsContent(this.videoDescription);
  }

  async subscribeButtonsCheck() {
    const cardElementsCount = await this.subscribeButton.count();
    expect(cardElementsCount).toBeGreaterThan(0);
    const cardElements = await this.subscribeButton.all();

    for (let i = 0; i < cardElementsCount; i++) {
      await cardElements[i].scrollIntoViewIfNeeded();
      await cardElements[i].hover({ force: true });
      await this.subscribeButtonAncestor.waitFor({ state: 'visible' });
    }
  }
  async clickSidebarButton(buttonName: string) {
    const sidebarVideoButton = this.page.getByLabel(buttonName, {
      exact: true,
    });
    await sidebarVideoButton.click();
  }
}
